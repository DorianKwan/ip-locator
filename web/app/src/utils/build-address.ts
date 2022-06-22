import { ApiData } from 'ip-locator-shared';

export const buildAddress = ({
  city,
  country,
  postal,
  accuracyRadius,
  timeZone,
}: ApiData.AddressDetails) => {
  const location = `${city} ${country}, ${postal}`;
  const accuracy = `Accuracy Radius of ${accuracyRadius}`;
  const time = `Timezone ${timeZone}`;

  return {
    location,
    accuracy,
    time,
  };
};
