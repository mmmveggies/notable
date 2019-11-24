import React from 'react';

const length = 12;
const majors = 'C.G.D.A.E.B.Gb.Db.Ab.Eb.Bb.F'.split('.');
const minors = 'a.e.b.f#.c#.g#.d#.a#.f.c.g.d'.split('.');

const rad = (deg: number) => (deg / 360) * 2 * Math.PI;

export interface CircleOfFifthsProps {
  zoom?: number
  fillRatio?: number
}

export const CircleOfFifths = (props: CircleOfFifthsProps) => {
  const {
    zoom = 1,
    fillRatio: k = 0.5,
  } = props;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 102 102"
      style={{ border: '1px solid black' }}
    >
      {Array.from({ length }, (_, i) => {
        const t0 = rad(((i - 0.5) / length) * 360);
        const t1 = rad(((i + 0.5) / length) * 360);
        const K = (1 - k);

        const outerX0 = zoom * 50 * Math.cos(t0);
        const outerY0 = zoom * 50 * Math.sin(t0);
        const outerX1 = zoom * 50 * Math.cos(t1);
        const outerY1 = zoom * 50 * Math.sin(t1);

        const innerX0 = zoom * 50 * k * Math.cos(t0);
        const innerY0 = zoom * 50 * k * Math.sin(t0);
        const innerX1 = zoom * 50 * k * Math.cos(t1);
        const innerY1 = zoom * 50 * k * Math.sin(t1);

        return (
          <g key={i}>
            <path
              id={`_cof_${i}`}
              fill="none"
              stroke="black"
              strokeWidth={0.3}
              d={`
                M 51,51
                m ${outerX0},${outerY0}
                a 50 50 0 0 1 ${outerX1 - outerX0},${outerY1 - outerY0}
                l ${-outerX1 * K},${-outerY1 * K}
                a ${50 * k} ${50 * k} 0 0 0 ${innerX0 - innerX1},${innerY0 - innerY1}
              `}
            />
            <text
              style={{ fontSize: 4 }}
              textAnchor="middle"
              x={51 - (outerX1 - outerX0) * 1.7}
              y={51 + 2 - (outerY1 - outerY0) * 1.7}
            >
              {majors[i]}
            </text>
            <text
              style={{ fontSize: 4 }}
              textAnchor="middle"
              x={51 - (outerX1 - outerX0) * 1.2}
              y={51 + 2 - (outerY1 - outerY0) * 1.2}
            >
              {minors[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
