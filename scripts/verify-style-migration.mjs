import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import { transform } from 'lightningcss';

// A migration-only baseline, not a policy forbidding future intentional design changes.
const workspace = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baseline = JSON.parse(
  fs.readFileSync(path.join(workspace, 'docs/refactor/style-baseline.json'), 'utf8'),
);
const selectorCache = new Map();
const digest = (value) => createHash('sha256').update(value).digest('hex');

function readCSS(file) {
  return fs
    .readFileSync(file, 'utf8')
    .replace(/@import\s+['"]([^'"]+)['"];?/g, (_, reference) =>
      reference.startsWith('.') ? readCSS(path.resolve(path.dirname(file), reference)) : '',
    );
}
function selectorAST(selector) {
  if (!selectorCache.has(selector)) {
    let value;
    transform({
      filename: 'selector.css',
      code: Buffer.from(`${selector}{--audit:0}`),
      visitor: {
        Rule(rule) {
          if (rule.type === 'style') value = rule.value.selectors[0];
        },
      },
    });
    selectorCache.set(selector, value);
  }
  return selectorCache.get(selector);
}
function specificity(parts) {
  return parts.reduce(
    (total, part) =>
      total +
      (part.type === 'id'
        ? 1e6
        : part.type === 'class' || part.type === 'attribute'
          ? 1e3
          : part.type === 'type' || part.type === 'pseudo-element'
            ? 1
            : part.type === 'pseudo-class'
              ? part.kind === 'where'
                ? 0
                : ['is', 'not', 'has', 'any'].includes(part.kind)
                  ? Math.max(...part.selectors.map(specificity))
                  : 1e3 + (part.of ? Math.max(...part.of.map(specificity)) : 0)
              : 0),
    0,
  );
}
function compatibleConditions(a, b) {
  const conditions = `${a} ${b}`;
  if (conditions.includes('@media print') && /@media screen/.test(conditions)) return false;
  let min = 0,
    max = Infinity;
  for (const match of conditions.matchAll(/(min|max)-width:\s*(\d+)px/g)) {
    if (match[1] === 'min') min = Math.max(min, Number(match[2]));
    else max = Math.min(max, Number(match[2]));
  }
  return (
    min <= max &&
    !(
      conditions.includes('prefers-reduced-motion: reduce') &&
      conditions.includes('prefers-reduced-motion: no-preference')
    )
  );
}
function collect(files) {
  const sequences = new Map(),
    records = [],
    occurrences = new Map();
  for (const file of files) {
    postcss.parse(readCSS(file)).walkRules((rule) => {
      if (rule.parent.type === 'atrule' && rule.parent.name === 'keyframes') return;
      const parents = [];
      for (let parent = rule.parent; parent.type !== 'root'; parent = parent.parent)
        parents.unshift(`@${parent.name} ${parent.params}`);
      const scope = parents.join('|');
      for (const selector of postcss.list.comma(rule.selector)) {
        const key = `${scope}|${selector}`;
        if (!sequences.has(key)) sequences.set(key, []);
        for (const declaration of rule.nodes ?? []) {
          if (declaration.type !== 'decl') continue;
          const value = declaration.value.replace(/\s+/g, ' ').trim();
          const serialized = `${declaration.prop}:${value}${declaration.important ? '!important' : ''}`;
          sequences.get(key).push(serialized);
          const identity = `${key}|${serialized}`,
            occurrence = occurrences.get(identity) ?? 0;
          occurrences.set(identity, occurrence + 1);
          records.push({
            id: digest(`${identity}#${occurrence}`),
            selector,
            scope,
            value,
            property: declaration.prop,
            family: declaration.prop.startsWith('--')
              ? declaration.prop
              : declaration.prop.replace(
                  /^(margin|padding|border|background|font|animation|transition|grid|flex)(?:-.+)?$/,
                  '$1',
                ),
            important: Boolean(declaration.important),
            specificity: specificity(selectorAST(selector)),
          });
        }
      }
    });
  }
  return { sequences, records };
}
function cascadeFingerprint(records) {
  const groups = new Map(),
    pairs = [];
  const overlapSet = new Set(baseline.overlaps);
  const overlaps = (a, b) => overlapSet.has([a, b].sort().join('|'));
  for (const record of records) {
    const key = `${record.specificity}|${record.family}|${record.important}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  for (const group of groups.values())
    for (let i = 0; i < group.length; i++)
      for (let j = i + 1; j < group.length; j++) {
        const a = group[i],
          b = group[j];
        if (
          (a.value === b.value && a.property === b.property) ||
          !compatibleConditions(a.scope, b.scope) ||
          !overlaps(a.selector, b.selector)
        )
          continue;
        pairs.push(`${a.id}<${b.id}`);
      }
  return { hash: digest(pairs.sort().join('\n')), pairs: pairs.length };
}

// The baseline overlap set was derived from both original language pages. Its
// matching allowed every pseudo/attribute state, so it conservatively includes
// menu, theme, intro, language and motion variants absent from static HTML.
const { sequences, records } = collect([path.join(workspace, 'src/styles/index.css')]);
const hashes = Object.fromEntries(
  [...sequences].map(([key, values]) => [key, digest(values.join('\n'))]),
);
assert.deepEqual(
  hashes,
  baseline.declarations,
  'Retained selector/condition declaration sequences changed',
);
const cascade = cascadeFingerprint(records);
assert.deepEqual(
  cascade,
  baseline.cascade,
  'A compatible equal-specificity cross-selector cascade changed',
);
console.log(
  `Style migration verified: ${sequences.size} selector/condition pairs and ${cascade.pairs} overlapping cascade relationships`,
);
