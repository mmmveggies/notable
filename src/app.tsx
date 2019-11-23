import React from 'react';
import { Keyboard } from './components/keyboard';
import { CircleOfFifths } from './components/circle-of-fifths';

export const App = () => {
  const [pressed, setPressed] = React.useState(new Set<number>());

  return (
    <>
      <Keyboard
        whiteKeyProps={(midi) => ({
          style: {
            background: pressed.has(midi) ? 'green' : undefined,
          },
          onClick: () => {
            setPressed((curr) => new Set([...pressed, midi]));
          },
        })}
      />
      <CircleOfFifths />
    </>
  );
};
