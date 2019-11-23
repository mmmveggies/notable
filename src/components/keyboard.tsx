import React from 'react';
import { Empty, Icon } from 'antd';
import { midiToNoteName } from '@tonaljs/midi';

export interface KeyboardKeyProps extends React.HTMLAttributes<HTMLDivElement> {
}

export type GetKeyboardKeyProps = (midi: number) => KeyboardKeyProps

export interface KeyboardProps {
  /** Starting key midi */
  start?: number

  /** Ending key midi */
  end?: number

  /** Derive props for a given white key */
  whiteKeyProps?: GetKeyboardKeyProps

  /** Derive props for a given black key */
  blackKeyProps?: GetKeyboardKeyProps
}

const noteName = (midi: number) => midiToNoteName(midi, { pitchClass: true, sharps: true });

const isBlack = (name: string) => name.endsWith('#');

export const Keyboard = ({
  start = 21,
  end = 108,
  whiteKeyProps,
  blackKeyProps,
}: KeyboardProps) => {
  const length = end - start;
  if (start <= 0 || length <= 0 || length > 100) {
    return (
      <Empty
        image={<Icon type="alert" />}
        description={`Bad note range: [${start}, ${end}]`}
      />
    );
  }
  if (isBlack(noteName(start)) || isBlack(noteName(end))) {
    return (
      <Empty
        image={<Icon type="alert" />}
        description="Must start and end on white keys"
      />
    );
  }

  return (
    <div className="keyboard">
      {Array.from({ length }, (_, i) => {
        const midi = i + start;
        const name = noteName(midi).toLowerCase();

        const currWhite = !isBlack(name);
        const nextBlack = currWhite && i < length && isBlack(noteName(midi + 1));

        const propsWhite = whiteKeyProps?.(midi);
        const propsBlack = nextBlack ? blackKeyProps?.(midi) : undefined;

        return currWhite ? (
          <div
            key={midi}
            {...propsWhite}
            className={`white note ${name} ${propsWhite?.className ?? ''}`}
          >
            {propsWhite?.children}
            {nextBlack ? (
              <div
                className={`black note ${name}-sharp ${propsBlack?.className ?? ''}`}
              >
                {propsBlack?.children}
              </div>
            ) : undefined}
          </div>
        ) : undefined;
      }).filter(Boolean)}
    </div>
  );
};
