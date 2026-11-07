import { experience, groupExperience, formatCompanyPeriod, formatPeriod } from '@/content/career';
import type { Dictionary } from '@/i18n/dictionaries';
import { sectionIds } from '@/navigation/sections';

export function Experience({ copy }: { copy: Dictionary['experience'] }) {
  return (
    <section className="container section session-section" id={sectionIds.experience}>
      <div className="session-title">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 data-rotate-text>
          {copy.title[0]}
          <br />
          <span>{copy.title[1]}</span>
        </h2>
      </div>
      <ol className="timeline">
        <span className="timeline-rail" aria-hidden="true">
          <span className="timeline-progress" />
        </span>
        {groupExperience(experience).map(({ company, roles }) => (
          <li
            key={company}
            className="timeline-company"
            data-current={!roles[0].end ? '' : undefined}
          >
            <span className="timeline-node" aria-hidden="true" />
            <header className="timeline-company-head">
              <h3>{company}</h3>
              <span className="mono">{formatCompanyPeriod({ company, roles })}</span>
              {!roles[0].end && <span className="mono session-current">{copy.current}</span>}
              {roles.length > 1 && (
                <span className="mono timeline-growth">
                  {roles[roles.length - 1].role} → {roles[0].role}
                </span>
              )}
            </header>
            <ol className="timeline-roles">
              {roles.map((item) => (
                <li key={item.id} className="timeline-role">
                  <span className="timeline-dot" aria-hidden="true" />
                  <div className="timeline-role-head">
                    <h4>{item.role}</h4>
                    <span className="mono">{formatPeriod(item)}</span>
                  </div>
                  <p>{copy.summaries[item.id]}</p>
                  <div className="session-foot">
                    <div className="tags">
                      {item.stack.map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </section>
  );
}
