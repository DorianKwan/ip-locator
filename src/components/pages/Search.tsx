import React from 'react';
import { Coordinates } from 'src/utils';

export interface SearchProps {
  coordinates?: Coordinates;
}

export const Search: React.VFC<SearchProps> = () => {
  return <>Search</>;
};
