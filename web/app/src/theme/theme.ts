import { gradients, buildGradient } from './gradients';

export interface Theme {
  readonly gradients: {
    [key: string]: Gradient;
  };
  readonly colors: typeof colors;
}

export interface Gradient {
  readonly fullName: string;
  /* fallback for old browsers */
  readonly fallback: string;
  /* styled-components handles webkit for older browser support */
  readonly background: string;
  readonly colors: string[];
}

const camelize = (fullName: string) => {
  return fullName
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
};

// DISCLAIMER: this is overkill, just figured I'd have lil fun
const buildThemeGradients = () => {
  const themeGradients: { [key: string]: Gradient } = {};

  let startIdx = 0;
  let endIdx = gradients.length - 1;

  while (startIdx <= endIdx) {
    const currStart = gradients[startIdx];
    const currEnd = gradients[endIdx];

    const startGradient = buildGradient(currStart);
    themeGradients[camelize(startGradient.fullName)] = startGradient;

    if (startIdx !== endIdx) {
      const endGradient = buildGradient(currEnd);
      themeGradients[camelize(endGradient.fullName)] = endGradient;
    }

    startIdx++;
    endIdx--;
  }

  return themeGradients;
};

export const colors = {
  ash: '#3f4c6b',
  pink: '#f8cdda',
  red: '#fe6666',
  darkRed: '#ff3e3e',
  green: '#51fa14',
  darkGreen: '#4fed15',
  purple: '#8f94fb',
};

const theme: Theme = {
  gradients: buildThemeGradients(),
  colors,
};

export default theme;
