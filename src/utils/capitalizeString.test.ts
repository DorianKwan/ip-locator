import { capitalizeString } from '.';

describe('capitalizeString', () => {
  it('capitalizes all lowercase string', () => {
    const stringToCapitalize = 'abu dabi';
    const expected = 'Abu Dabi';

    const capitalized = capitalizeString(stringToCapitalize);

    expect(capitalized === expected).toBeTruthy();
  });

  it('speedily capitalizes all lowercase string', () => {
    const stringToCapitalize = 'abu dabi';
    const expected = 'Abu Dabi';

    const capitalized = capitalizeString(stringToCapitalize, true);

    expect(capitalized === expected).toBeTruthy();
  });

  it('capitalizes mixed casing string', () => {
    const stringToCapitalize = 'aBu DaBi';
    const expected = 'Abu Dabi';

    const capitalized = capitalizeString(stringToCapitalize);

    expect(capitalized === expected).toBeTruthy();
  });

  it('speedily capitalizes mixed casing string', () => {
    const stringToCapitalize = 'aBu DaBi';
    const expected = 'Abu Dabi';

    const capitalized = capitalizeString(stringToCapitalize, true);

    expect(capitalized === expected).toBeTruthy();
  });

  it('capitalize all capped string', () => {
    const stringToCapitalize = 'ABU DABI';
    const expected = 'Abu Dabi';

    const capitalized = capitalizeString(stringToCapitalize);

    expect(capitalized === expected).toBeTruthy();
  });

  it('speedily capitalizes all capped string', () => {
    const stringToCapitalize = 'ABU DABI';
    const expected = 'Abu Dabi';

    const capitalized = capitalizeString(stringToCapitalize, true);

    expect(capitalized === expected).toBeTruthy();
  });
});
