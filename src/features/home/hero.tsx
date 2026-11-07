import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { GuitarScene } from '@/features/studio/guitar-scene';
import { FlyingCode } from '@/features/studio/flying-code';
import { CodeEditor, ReplayOpening } from '@/features/studio/code-editor';
import { site } from '@/content/site';
import type { Dictionary } from '@/i18n/dictionaries';
import { sectionIds } from '@/navigation/sections';

function SpinBadge() {
  return (
    <div className="spin-badge" aria-hidden="true">
      <div className="spin-badge-ring">
        <div className="badge-disc">
          <div className="badge-label">
            <span>{site.brand}</span>
            <i />
          </div>
        </div>
      </div>
      <div className="badge-shine" />
      <div className="badge-spindle" />
    </div>
  );
}

export function Hero({ copy, contactLabel }: { copy: Dictionary['hero']; contactLabel: string }) {
  return (
    <div className="performance-scene">
      <section className="performance-stage" aria-label={copy.label}>
        <div className="stage-word" aria-hidden="true">
          {'<Guitar/>'.split('').map((letter, index) => (
            <span className="stage-letter" key={index}>
              <span>{letter}</span>
            </span>
          ))}
        </div>
        <div className="stage-vignette" aria-hidden="true" />
        <div className="editor-wrap">
          <CodeEditor>
            <GuitarScene />
          </CodeEditor>
          <SpinBadge />
        </div>
        <FlyingCode />
        <ReplayOpening />
        <div className="stage-intro container">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>
            {copy.title}
            <br />
            <span>{copy.accent}</span>
          </h1>
          <p>{copy.pitch}</p>
          <div className="stage-actions">
            <Link href={`#${sectionIds.experience}`} className="stage-button primary">
              {copy.primary} <ArrowDown size={16} />
            </Link>
            <Link href={`#${sectionIds.contact}`} className="stage-button ghost">
              {copy.secondary} <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="stage-outro container">
          <p className="eyebrow">{copy.outroEyebrow}</p>
          <h2>
            {copy.outroTitle[0]}
            <br />
            {copy.outroTitle[1]}
          </h2>
          <p>
            {copy.outroLines[0]}
            <br />
            {copy.outroLines[1]}
          </p>
        </div>
        <div className="stage-bottom container">
          <span>{copy.bottom}</span>
          <span className="scroll-cue">
            {copy.scroll} <ArrowDown size={16} />
          </span>
          <Link href={`#${sectionIds.contact}`}>
            {contactLabel} <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
