import React from 'react';
import { Keyboard } from './components/keyboard';
import { CircleOfFifths } from './components/circle-of-fifths';

const Layout = () => (
  <div
    style={{
      display: 'grid',
      width: '100vw',
      height: '100vh',
      gridGap: '0.25em',
      padding: '0.25em',
      gridTemplateAreas: `
        ". cof"
        "keyboard keyboard"
      `,
    }}
  >
    <div style={{ gridArea: 'cof' }}>
      <CircleOfFifths />
    </div>
    <div style={{ gridArea: 'keyboard', height: '20vh' }}>
      <Keyboard />
    </div>
  </div>
);

export const App = () => (
  <Layout />
);
//   const [pressed, setPressed] = React.useState(new Set<number>());

//   return (
//     <>
//       <Keyboard
//         whiteKeyProps={(midi) => ({
//           style: {
//             background: pressed.has(midi) ? 'green' : undefined,
//           },
//           onClick: () => {
//             setPressed((curr) => new Set([...pressed, midi]));
//           },
//         })}
//       />
//       <CircleOfFifths />
//     </>
//   );
// };
