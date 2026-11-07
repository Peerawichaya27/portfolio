/** Original vector illustration: a guitar's six strings carried through a studio patch. */
export function StudioSignature() {
  return (
    <div className="studio-signature">
      <div className="studio-label">
        <span>Guitar / tarpp.dev</span>
        <span>Music & technology</span>
      </div>
      <div className="guitar-stage">
        <svg
          className="guitar-drawing"
          viewBox="0 0 520 240"
          role="img"
          aria-label="Layered illustration of a six-string guitar"
        >
          <path
            className="guitar-depth"
            transform="translate(0 9)"
            d="M365 72C385 41 432 43 451 68C462 83 457 93 469 102C490 117 491 151 472 169C446 194 400 190 379 164C368 151 351 157 345 140C339 124 350 116 349 104C348 89 354 80 365 72Z"
          />
          <rect className="guitar-neck-depth" x="49" y="110" width="315" height="34" rx="2" />
          <path
            className="guitar-body"
            d="M365 72C385 41 432 43 451 68C462 83 457 93 469 102C490 117 491 151 472 169C446 194 400 190 379 164C368 151 351 157 345 140C339 124 350 116 349 104C348 89 354 80 365 72Z"
          />
          <rect className="guitar-neck" x="115" y="103" width="249" height="34" rx="2" />
          <path className="guitar-head" d="M49 98L115 103V137L49 142L37 132V108Z" />
          <circle className="guitar-hole" cx="404" cy="120" r="25" />
          <circle className="guitar-rosette" cx="404" cy="120" r="31" />
          {[146, 175, 202, 227, 250, 271, 290, 307, 322, 335, 346].map((x) => (
            <path key={x} className="guitar-fret" d={`M${x} 104V136`} />
          ))}
          {[108, 113, 118, 123, 128, 133].map((y, i) => (
            <g key={y}>
              <path className="guitar-string" d={`M62 ${y}H450`} />
              <circle className="guitar-pin" cx={450} cy={y} r="1.5" />
              <path
                className="guitar-tuner"
                d={`M${62 + (i % 3) * 16} ${i < 3 ? 101 : 139}v${i < 3 ? -10 : 10}`}
              />
            </g>
          ))}
          <path className="guitar-bridge" d="M444 102V139" />
          {[188, 240, 282, 314].map((x) => (
            <circle key={x} className="fret-marker" cx={x} cy="120" r="2" />
          ))}
        </svg>
      </div>
      <div className="studio-caption">
        <span>Six strings. A different kind of connection.</span>
        <span aria-hidden="true">↳</span>
      </div>
    </div>
  );
}
