import React from 'react';
import styled from '@emotion/styled';
import { Search } from '../search';
import { AnimatedText, PageWrapper } from '../utility';

const ANIMATED_TEXT_DURATION = 0.05;

export interface SearchProps {}

export const AddressSearch: React.VFC<SearchProps> = () => {
  return (
    <SearchPageWrapper>
      <SearchContainer>
        <SearchHeading>
          <AnimatedText
            duration={ANIMATED_TEXT_DURATION / 2}
            content="Street Address by IP"
          />
        </SearchHeading>
        <Search />
      </SearchContainer>
    </SearchPageWrapper>
  );
};

const SearchPageWrapper = styled(PageWrapper)`
  display: grid;
  place-items: center;
`;

const SearchContainer = styled.div``;

const SearchHeading = styled.h1`
  font-size: 3rem;
  line-height: 1;
  margin-bottom: 1.5rem;

  @media only screen and (min-width: 1200px) {
    font-size: 4.5rem;
    margin-bottom: 2.25rem;
  }
`;
