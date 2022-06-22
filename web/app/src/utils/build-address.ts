import { ApiData } from 'ip-locator-shared';

export const buildAddress = ({
  city,
  country,
  postal,
  accuracyRadius,
  timeZone,
}: ApiData.AddressDetails) => {
  const location = `is located within ${city} ${country}, ${postal}`;
  const accuracy = `with an accuracy radius of ${accuracyRadius}`;
  const time = `in the timezone of ${timeZone}`;
  const full = `${city} ${country} ${postal} ${accuracyRadius} ${timeZone}`;

  return {
    location,
    accuracy,
    time,
    full,
  };
};
