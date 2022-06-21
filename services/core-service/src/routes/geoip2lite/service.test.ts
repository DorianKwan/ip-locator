import Service, { GeoIp2LiteServiceError } from './service';

describe('GeoIp2Lite Service', () => {
  it('returns proper address details', async () => {
    const mockedCity = 'Everywhere, no where..';
    const mockedCountry = 'There are no countries here';
    const mockedPostal = 'Postman will have a hard time finding it';
    const mockedAccuracyRadius = Number.POSITIVE_INFINITY;
    const mockedTimeZone = 'Just another dimension here travels';

    const repo = {
      getAddressByIp: jest.fn().mockResolvedValueOnce({
        city: { names: { en: mockedCity } },
        country: { names: { en: mockedCountry } },
        postal: { code: mockedPostal },
        location: {
          accuracyRadius: mockedAccuracyRadius,
          timeZone: mockedTimeZone,
        },
      }),
    };

    const service = new Service(repo as any);

    const addressDetails = await service.findAddressByIp('0.0.0.0');

    expect(addressDetails.city).toBe(mockedCity);
    expect(addressDetails.country).toBe(mockedCountry);
    expect(addressDetails.postal).toBe(mockedPostal);
    expect(addressDetails.accuracyRadius).toBe(mockedAccuracyRadius);
    expect(addressDetails.timeZone).toBe(mockedTimeZone);
  });

  it('throws when no city is found', async () => {
    const mockedCountry = 'There are no countries here';
    const mockedPostal = 'Postman will have a hard time finding it';
    const mockedAccuracyRadius = Number.POSITIVE_INFINITY;
    const mockedTimeZone = 'Just another dimension here travels';

    const repo = {
      getAddressByIp: jest.fn().mockResolvedValueOnce({
        country: { names: { en: mockedCountry } },
        postal: { code: mockedPostal },
        location: {
          accuracyRadius: mockedAccuracyRadius,
          timeZone: mockedTimeZone,
        },
      }),
    };

    const service = new Service(repo as any);

    expect.assertions(1);

    try {
      await service.findAddressByIp('0.0.0.0');
    } catch (error: any) {
      expect(error.type).toBe(GeoIp2LiteServiceError.NoCityFound);
    }
  });

  it('throws when no country is found', async () => {
    const mockedCity = 'Everywhere, no where..';
    const mockedPostal = 'Postman will have a hard time finding it';
    const mockedAccuracyRadius = Number.POSITIVE_INFINITY;
    const mockedTimeZone = 'Just another dimension here travels';

    const repo = {
      getAddressByIp: jest.fn().mockResolvedValueOnce({
        city: { names: { en: mockedCity } },
        postal: { code: mockedPostal },
        location: {
          accuracyRadius: mockedAccuracyRadius,
          timeZone: mockedTimeZone,
        },
      }),
    };

    const service = new Service(repo as any);

    expect.assertions(1);

    try {
      await service.findAddressByIp('0.0.0.0');
    } catch (error: any) {
      expect(error.type).toBe(GeoIp2LiteServiceError.NoCountryFound);
    }
  });

  it('throws when no postal is found', async () => {
    const mockedCity = 'Everywhere, no where..';
    const mockedCountry = 'There are no countries here';
    const mockedAccuracyRadius = Number.POSITIVE_INFINITY;
    const mockedTimeZone = 'Just another dimension here travels';

    const repo = {
      getAddressByIp: jest.fn().mockResolvedValueOnce({
        city: { names: { en: mockedCity } },
        country: { names: { en: mockedCountry } },
        location: {
          accuracyRadius: mockedAccuracyRadius,
          timeZone: mockedTimeZone,
        },
      }),
    };

    const service = new Service(repo as any);

    expect.assertions(1);

    try {
      await service.findAddressByIp('0.0.0.0');
    } catch (error: any) {
      expect(error.type).toBe(GeoIp2LiteServiceError.NoPostalFound);
    }
  });

  it('throws when no accuracy location is found', async () => {
    const mockedCity = 'Everywhere, no where..';
    const mockedCountry = 'There are no countries here';
    const mockedPostal = 'Postman will have a hard time finding it';

    const repo = {
      getAddressByIp: jest.fn().mockResolvedValueOnce({
        city: { names: { en: mockedCity } },
        country: { names: { en: mockedCountry } },
        postal: { code: mockedPostal },
      }),
    };

    const service = new Service(repo as any);

    expect.assertions(1);

    try {
      await service.findAddressByIp('0.0.0.0');
    } catch (error: any) {
      expect(error.type).toBe(GeoIp2LiteServiceError.NoLocationFound);
    }
  });

  it('throws when no timezone is found', async () => {
    const mockedCity = 'Everywhere, no where..';
    const mockedCountry = 'There are no countries here';
    const mockedPostal = 'Postman will have a hard time finding it';
    const mockedAccuracyRadius = Number.POSITIVE_INFINITY;

    const repo = {
      getAddressByIp: jest.fn().mockResolvedValueOnce({
        city: { names: { en: mockedCity } },
        country: { names: { en: mockedCountry } },
        postal: { code: mockedPostal },
        location: {
          accuracyRadius: mockedAccuracyRadius,
        },
      }),
    };

    const service = new Service(repo as any);

    expect.assertions(1);

    try {
      await service.findAddressByIp('0.0.0.0');
    } catch (error: any) {
      expect(error.type).toBe(GeoIp2LiteServiceError.NoTimeZoneFound);
    }
  });
});
