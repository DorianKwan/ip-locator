import React from 'react';
import { render, screen } from '../../utils';
import { Nav } from './Nav';

describe('Nav', () => {
  it('renders app logo ', () => {
    render(React.createElement(Nav));
    const appLogo = screen.getByAltText(/app-logo/i);
    expect(appLogo).toBeInTheDocument();
  });
});
