import React from 'react';

const length = 12;

const rad = (deg: number) => (deg / 360) * 2 * Math.PI;

export interface CircleOfFifthsProps {
  fillRatio?: number
}

export const CircleOfFifths = (props: CircleOfFifthsProps) => {
  // const { fillRatio = 0.3 } = props;
  const [fillRatio, setFillRatio] = React.useState(0);
  React.useEffect(() => {
    setInterval(() => {
      setFillRatio((c) => (c <= 0 ? 1 : c - 0.005));
    }, 1000);
  });

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 102 102"
      style={{ border: '1px solid black' }}
    >
      {Array.from({ length }, (_, i) => {
        const t0 = rad((i / length) * 360);
        const t1 = rad(((i + 1) / length) * 360);

        const outerX0 = 50 * Math.cos(t0);
        const outerY0 = 50 * Math.sin(t0);
        const outerX1 = 50 * Math.cos(t1);
        const outerY1 = 50 * Math.sin(t1);

        const innerX0 = 50 * fillRatio * Math.cos(t0);
        const innerY0 = 50 * fillRatio * Math.sin(t0);
        const innerX1 = 50 * fillRatio * Math.cos(t1);
        const innerY1 = 50 * fillRatio * Math.sin(t1);

        return (
          <path
            key={i}
            fill="red"
            stroke="green"
            d={`
              M 51,51
              m ${outerX0},${outerY0}
              a 50 50 0 0 1 ${outerX1 - outerX0},${outerY1 - outerY0}
              l ${-innerX1},${-innerY1}
              a ${50},${50} 0 0 0 ${innerX0 - innerX1},${innerY0 - innerY1}
              z
            `}
          />
        );
      })}
    </svg>
  );
};
