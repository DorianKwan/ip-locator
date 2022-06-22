import React from 'react';
import { Theme, colors } from 'src/theme';
import { render, screen } from '../../utils';
import { Home } from './Home';

const mockTheme: Theme = {
  colors,
  // BEWARE: adding more than two gradients will break these tests
  gradients: {
    blu: {
      fullName: 'Blu',
      fallback: '#00416A',
      background: 'linear-gradient(0deg, #00416A, #E4E5E6)',
      colors: ['#00416A', '#E4E5E6'],
    },
    verBlack: {
      fullName: 'Ver Black',
      fallback: '#F7F8F8',
      background: 'linear-gradient(0deg, #F7F8F8, #ACBB78)',
      colors: ['#F7F8F8', '#ACBB78'],
    },
  },
};

const determineLeftOverGradient = (initialGradientName: string) => {
  // airbnb doesn't like it when you return, break or continue in a loop ¯\_(ツ)_/¯
  // eslint-disable-next-line no-restricted-syntax
  for (const gradient of Object.values(mockTheme.gradients)) {
    if (gradient.fullName !== initialGradientName) return gradient.fullName;
  }
};

describe('Home page', () => {
  let initialGradientName = '';

  beforeEach(() => {
    render(React.createElement(Home), {}, mockTheme);

    // determine name because gradient is random on load
    initialGradientName = screen.getByLabelText('gradient-name').innerHTML;
  });

  it('renders home screen', () => {
    const welcomeContainer = screen.getByLabelText(/welcome/i);
    expect(welcomeContainer).toBeInTheDocument();
  });

  it('renders correct next gradient', async () => {
    if (!initialGradientName) {
      throw new Error('Initial Gradient did not exist on screen attribute');
    }

    const nextButton = screen.getByText('Next');
    nextButton.click();

    const currentGradientName =
      screen.getByLabelText('gradient-name').innerHTML;

    const leftOverGradientName = determineLeftOverGradient(initialGradientName);

    expect(currentGradientName === leftOverGradientName).toBeTruthy();
  });

  it('renders correct prev gradient', async () => {
    if (!initialGradientName) {
      throw new Error('Initial Gradient did not exist on screen attribute');
    }

    const prevButton = screen.getByText('Prev');
    prevButton.click();

    const currentGradientName =
      screen.getByLabelText('gradient-name').innerHTML;

    const leftOverGradientName = determineLeftOverGradient(initialGradientName);

    expect(currentGradientName === leftOverGradientName).toBeTruthy();
  });

  it('renders correct gradient when end is hit using next', async () => {
    if (!initialGradientName) {
      throw new Error('Initial Gradient did not exist on screen attribute');
    }

    const nextButton = screen.getByText('Next');
    nextButton.click();
    nextButton.click();

    const currentGradientName =
      screen.getByLabelText('gradient-name').innerHTML;

    expect(initialGradientName === currentGradientName).toBeTruthy();
  });

  it('renders correct gradient when end is hit using prev', async () => {
    if (!initialGradientName) {
      throw new Error('Initial Gradient did not exist on screen attribute');
    }

    const prevButton = screen.getByText('Prev');
    prevButton.click();
    prevButton.click();

    const currentGradientName =
      screen.getByLabelText('gradient-name').innerHTML;

    expect(initialGradientName === currentGradientName).toBeTruthy();
  });
});
