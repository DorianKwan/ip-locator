import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import sweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { buildAddress } from 'src/utils';
import { coreServiceApi } from 'src/api';
import { useAsyncEffect, useTypedTheme } from 'src/hooks';
import { AnimatedText, FadeIn, Loader } from '../utility';

const ANIMATED_TEXT_DURATION = 0.05;
const FADE_IN_DELAY = 0.4;
const FADE_IN_DURATION = 1.75;
const DEFAULT_IP = '0.0.0.0';
const DEFAULT_ADDRESS = 'Everywhere.. Nowhere..';
const DEFAULT_ACCURACY = '';
const DEFAULT_TIME = '';

export const Search: React.VFC = () => {
  const theme = useTypedTheme();
  const [ipAddress, setIpAddress] = useState<string>(DEFAULT_IP);
  const [streetAddress, setStreetAddress] = useState<string>(DEFAULT_ADDRESS);
  const [accuracyRadius, setAccuracyRadius] =
    useState<string>(DEFAULT_ACCURACY);
  const [timeZone, setTimeZone] = useState<string>(DEFAULT_TIME);
  const [inputVal, setInputVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const prevIpRef = useRef<string>(DEFAULT_IP);
  const prevAddressRef = useRef<string>(DEFAULT_ADDRESS);

  useAsyncEffect(async () => {
    if (ipAddress !== prevIpRef.current && ipAddress !== DEFAULT_IP) {
      try {
        setIsLoading(true);

        const addressDetails = await coreServiceApi.geoip2.getAddressByIp(
          ipAddress,
        );

        const { location, accuracy, time } = buildAddress(addressDetails);

        prevAddressRef.current = location;
        prevIpRef.current = ipAddress;

        setStreetAddress(location);
        setAccuracyRadius(accuracy);
        setTimeZone(time);
        setIsLoading(false);
      } catch (err) {
        setIpAddress(prevIpRef.current || DEFAULT_IP);
        setStreetAddress(prevAddressRef.current || DEFAULT_ADDRESS);
        setIsLoading(false);

        // error handling isn't ideal here and could be improved
        const errorMessage =
          err instanceof Error ? err.message : 'Please check your connection';

        MySweetAlert.fire({
          title: 'Error Fetching Location',
          text: errorMessage,
          icon: 'error',
        });
      }
    } else {
      setIsLoading(false);
    }
  }, [ipAddress]);

  if (isLoading) {
    return <Loader />;
  }

  const onSearch = () => {
    setIpAddress(inputVal);
    setInputVal('');
  };

  return (
    <>
      <IpAddress>
        <AnimatedText
          capitalize
          duration={ANIMATED_TEXT_DURATION}
          content={ipAddress}
        />
      </IpAddress>
      <AddressInfo>
        <AnimatedText
          duration={ANIMATED_TEXT_DURATION}
          content={streetAddress}
        />
      </AddressInfo>
      {accuracyRadius !== '' && (
        <AddressInfo>
          <AnimatedText
            duration={ANIMATED_TEXT_DURATION}
            content={accuracyRadius}
          />
        </AddressInfo>
      )}
      {timeZone !== '' && (
        <AddressInfo>
          <AnimatedText duration={ANIMATED_TEXT_DURATION} content={timeZone} />
        </AddressInfo>
      )}
      <FadeIn delay={FADE_IN_DELAY} duration={FADE_IN_DURATION}>
        <InputWrapper>
          <IpInput
            placeholder="IP Address"
            onChange={event => setInputVal(event.currentTarget.value)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                onSearch();
              }
            }}
            focusedBorderColor={theme.colors.purple}
            value={inputVal}
          />
          <ButtonWrapper>
            <ActionButton
              type="button"
              aria-label="search for address by IP address"
              onClick={() => onSearch()}
              bgColor={theme.colors.green}
              hoverColor={theme.colors.darkGreen}>
              Search
            </ActionButton>
            <ActionButton
              type="button"
              aria-label="clear IP input"
              onClick={() => setInputVal('')}
              bgColor={theme.colors.red}
              hoverColor={theme.colors.darkRed}>
              Clear
            </ActionButton>
          </ButtonWrapper>
        </InputWrapper>
      </FadeIn>
    </>
  );
};

const MySweetAlert = withReactContent(sweetAlert);

const IpAddress = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;

  @media only screen and (min-width: 1200px) {
    font-size: 3.75rem;
    margin-bottom: 1.5rem;
  }
`;

const AddressInfo = styled.p`
  font-size: 1.5rem;
  margin-bottom: 0.25rem;

  :last-of-type {
    margin-bottom: 2.25rem;
  }

  @media only screen and (min-width: 1200px) {
    font-size: 2.25rem;
    margin-bottom: 0.5rem;

    :last-of-type {
      margin-bottom: 3.25rem;
    }
  }
`;

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 3.5fr 1fr;
  grid-template-rows: 1fr;
  gap: 0.75rem;
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding-bottom: 1rem;
  width: 100%;

  & > button:not(:last-of-type) {
    margin-right: 0.5rem;
  }
`;

const ActionButton = styled.button<{
  bgColor: string;
  hoverColor: string;
}>`
  border: none;
  color: white;
  background: ${props => props.bgColor};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0.5rem 1rem;
  transition: background 0.25s ease-in-out;
  border-radius: 0.75rem;

  &:hover,
  &:focus {
    background: ${props => props.hoverColor};
    cursor: pointer;
  }

  @media only screen and (min-width: 1200px) {
    font-size: 1.6rem;
  }
`;

const IpInput = styled.input<{ focusedBorderColor: string }>`
  font-size: 1.125rem;
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
