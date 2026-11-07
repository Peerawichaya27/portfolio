import type { CSSProperties } from 'react';
import { skillDrum, skillEntries } from '@/content/skills';
import type { Dictionary } from '@/i18n/dictionaries';
import { sectionIds } from '@/navigation/sections';

export function Skills({ copy }: { copy: Dictionary['setup'] }) {
  return (
    <section className="equipment-section" id={sectionIds.setup}>
      <div className="drum-track">
        <div className="drum-sticky container">
          <div className="drum-copy">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 data-rotate-text>
              {copy.title[0]}
              <br />
              {copy.title[1]}
            </h2>
            <p>
              {copy.copy[0]}
              <br />
              {copy.copy[1]}
            </p>
            <p className="drum-category mono" aria-hidden="true">
              <span>{copy.nowPlaying}</span>
              <span data-drum-category>{copy.categories[skillDrum[0].category]}</span>
            </p>
          </div>
          <div className="drum-viewport" aria-hidden="true">
            <div className="drum-axis" style={{ '--n': skillDrum.length } as CSSProperties}>
              <ul className="skill-drum">
                {skillDrum.map((item, index) => (
                  <li
                    key={`${item.category}-${item.value}`}
                    data-category={copy.categories[item.category]}
                    style={{ '--i': index } as CSSProperties}
                  >
                    <span>{item.value}</span>
                    <small>{String(index + 1).padStart(2, '0')}</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container equipment-list">
        {skillEntries.map(([name, values]) => (
          <div key={name} data-reveal>
            <h3>{copy.categories[name]}</h3>
            <p>{values.join(' / ')}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
