import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import sweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Coordinates } from '../../utils';
import { useAsyncEffect, useTypedTheme } from '../../hooks';
import { AnimatedText, FadeIn, Loader, PageWrapper } from '../utility';

const ANIMATED_TEXT_DURATION = 0.05;
const FADE_IN_DELAY = 0.4;
const FADE_IN_DURATION = 1.75;
export interface SearchProps {
  coordinates?: Coordinates;
}

interface GeoIPData {
  address: string;
}

export const Search: React.VFC<SearchProps> = () => {
  const theme = useTypedTheme();
  const [ipAddress, setIpAddress] = useState<string>('');
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [inputVal, setInputVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const prevAddressRef = useRef<string | undefined>();

  useAsyncEffect(async () => {
    if (ipAddress !== prevAddressRef.current) {
      try {
        setIsLoading(true);

        const response = await fetch('');

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`IP address ${ipAddress} was not found. Typo?`);
          }

          throw new Error('GeoIP2 API Fetch Failed');
        }

        const locationData = (await response.json()) as GeoIPData;

        const searchedAddress = locationData.address;

        prevAddressRef.current = searchedAddress;

        setStreetAddress(searchedAddress);
        setIsLoading(false);
      } catch (err) {
        setStreetAddress(prevAddressRef.current || '');
        setIsLoading(false);

        // error handling isn't ideal here and could be improved drastically
        const errorMessage =
          err instanceof Error ? err.message : 'Please check your connection';

        MySweetAlert.fire({
          title: 'Error Fetching Location',
          text: errorMessage,
          icon: 'error',
        });
      }
    }
  }, [ipAddress]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SearchPageWrapper>
      <SearchContainer>
        <SearchHeading>
          <AnimatedText
            duration={ANIMATED_TEXT_DURATION}
            content="Street Address by IP"
          />
        </SearchHeading>
        <StreetAddress>
          <AnimatedText
            capitalize
            duration={ANIMATED_TEXT_DURATION}
            content={streetAddress}
          />
        </StreetAddress>
        <FadeIn delay={FADE_IN_DELAY} duration={FADE_IN_DURATION}>
          <InputWrapper>
            <IpInput
              placeholder="IP Address"
              onChange={event => setInputVal(event.currentTarget.value)}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  setIpAddress(inputVal);
                  setInputVal('');
                }
              }}
              focusedBorderColor={theme.colors.purple}
              value={inputVal}
            />
            <ClearWrapper>
              <ClearButton
                type="button"
                aria-label="clear IP input"
                onClick={() => setInputVal('')}
                bgColor={theme.colors.green}
                hoverColor={theme.colors.darkGreen}>
                Clear
              </ClearButton>
            </ClearWrapper>
          </InputWrapper>
        </FadeIn>
      </SearchContainer>
    </SearchPageWrapper>
  );
};

const MySweetAlert = withReactContent(sweetAlert);

const SearchPageWrapper = styled(PageWrapper)`
  display: grid;
  place-items: center;
`;

const SearchContainer = styled.div``;

const SearchHeading = styled.h1`
  font-size: 3rem;
  line-height: 1;
  margin-bottom: 0.5rem;

  @media only screen and (min-width: 1200px) {
    font-size: 4.5rem;
    margin-bottom: 0.75rem;
  }
`;

const StreetAddress = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.75rem;

  @media only screen and (min-width: 1200px) {
    font-size: 3.25em;
    margin-bottom: 1rem;
  }
`;

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 3.5fr 1fr;
  grid-template-rows: 1fr;
  gap: 0.75rem;
  width: 100%;
  max-width: 25rem;
  margin: 0 auto;
`;

const ClearWrapper = styled.div`
  padding-bottom: 1rem;
  width: 100%;
`;

const ClearButton = styled.button<{ bgColor: string; hoverColor: string }>`
  border: none;
  color: white;
  background: ${props => props.bgColor};
  font-weight: bold;
  padding: 0.45rem 1rem;
  transition: background 0.25s ease-in-out;
  border-radius: 0.75rem;

  &:hover {
    background: ${props => props.hoverColor};
  }

  @media only screen and (min-width: 1200px) {
    font-size: 1.6rem;
    padding: 0.5rem 1rem;
  }
`;

const IpInput = styled.input<{ focusedBorderColor: string }>`
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  border-style: none;
  border: 1px solid black;
  margin-bottom: 1rem;

  &:focus-visible {
    outline: none;
    border: 1px solid ${({ focusedBorderColor }) => focusedBorderColor};
    box-shadow: 0 0 1px 1px ${({ focusedBorderColor }) => focusedBorderColor};
  }

  @media only screen and (min-width: 1200px) {
    font-size: 1.6rem;
    padding: 0.5rem 1.25rem;
  }
`;
