import assert from 'node:assert/strict';
import test from 'node:test';
import {
  experience,
  formatCompanyPeriod,
  formatMonth,
  formatPeriod,
  groupExperience,
  isoMonth,
} from '../src/content/career';
import { site } from '../src/content/site';
import { skillEntries, skillDrum } from '../src/content/skills';
import { publications } from '../src/content/publications';
import { dictionaries } from '../src/i18n/dictionaries';
import { HOME, LANGS, homeHref, langFromPath, localizedUrls } from '../src/i18n/routing';
import { homeMetadata } from '../src/i18n/metadata';
import { sections, sectionHref } from '../src/navigation/sections';
import { isLegacyProject, legacyDestinations, legacyProjectSlugs } from '../src/navigation/legacy';

test('career formatting retains the published periods and uses structured dates', () => {
  assert.equal(formatMonth({ year: 2026, month: 8 }), 'Aug 2026');
  assert.equal(isoMonth({ year: 2025, month: 1 }), '2025-01');
  assert.deepEqual(experience.map(formatPeriod), [
    'Aug 2026 — Present',
    'Nov 2025 — Jul 2026',
    'Jan 2025 — May 2025',
  ]);
});

test('career grouping handles interleaved roles without relying on array adjacency', () => {
  const companies = groupExperience([experience[2], experience[0], experience[1]]);
  assert.equal(companies.length, 2);
  assert.equal(companies[0].company, 'PTT Digital');
  const gosoft = companies.find((company) => company.company === 'Gosoft (Thailand)');
  assert(gosoft);
  assert.deepEqual(
    gosoft.roles.map((role) => role.id),
    ['gosoft-developer', 'gosoft-intern'],
  );
  assert.equal(formatCompanyPeriod(gosoft), 'Jan 2025 — Jul 2026');
});

test('both locales have translations for every current role and skill category', () => {
  for (const lang of LANGS) {
    const dictionary = dictionaries[lang];
    for (const role of experience)
      assert(dictionary.experience.summaries[role.id]?.trim(), `${lang}: ${role.id}`);
    for (const [category] of skillEntries)
      assert(dictionary.setup.categories[category]?.trim(), `${lang}: ${category}`);
  }
  assert.equal(new Set(experience.map((role) => role.id)).size, experience.length);
  assert.equal(
    skillDrum.length,
    skillEntries.reduce((count, [, values]) => count + values.length, 0),
  );
});

test('locale routing distinguishes Thai routes from lookalike English paths', () => {
  assert.equal(langFromPath('/'), 'en');
  assert.equal(langFromPath('/th'), 'th');
  assert.equal(langFromPath('/th/'), 'th');
  assert.equal(langFromPath('/theme'), 'en');
  assert.equal(langFromPath(null), 'en');
  assert.equal(homeHref('en', 'contact'), '/#contact');
  assert.equal(homeHref('th', 'contact'), '/th#contact');
});

test('navigation anchors stay valid for every supported locale', () => {
  const ids = sections.map((section) => section.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(ids, ['about', 'experience', 'setup', 'research', 'contact']);
  for (const lang of LANGS) {
    for (const section of sections) {
      assert.equal(sectionHref(lang, section.id), `${HOME[lang]}#${section.id}`);
      assert(dictionaries[lang].nav[section.label]);
    }
  }
});

test('metadata and language alternates use the same site identity and home URLs', () => {
  const absolute = localizedUrls();
  for (const lang of LANGS) {
    const metadata = homeMetadata(lang);
    assert.equal(metadata.alternates?.canonical, HOME[lang]);
    assert.equal(metadata.alternates?.languages?.[lang], HOME[lang]);
    assert.equal(metadata.description, dictionaries[lang].meta.description);
    assert(dictionaries[lang].meta.title.includes(site.name));
    assert.equal(new URL(absolute[lang]).origin, site.origin);
  }
});

test('compatibility routes preserve their existing destinations and validate old slugs', () => {
  assert.deepEqual(legacyDestinations, {
    about: '/#about',
    blog: '/#research',
    resume: '/#experience',
    projects: '/#experience',
  });
  assert.deepEqual([...legacyProjectSlugs], ['aegis-core', 'allmap', 'timeline-integration']);
  for (const slug of legacyProjectSlugs) assert.equal(isLegacyProject(slug), true);
  assert.equal(isLegacyProject('not-a-project'), false);
  assert.equal(isLegacyProject('constructor'), false);
});

test('publication links remain explicit paper destinations', () => {
  assert.equal(publications.length, 2);
  for (const publication of publications) {
    const url = new URL(publication.url);
    assert.equal(url.protocol, 'https:');
    assert.equal(url.hostname, 'ieeexplore.ieee.org');
    assert.match(url.pathname, /^\/document\/\d+$/);
  }
});
