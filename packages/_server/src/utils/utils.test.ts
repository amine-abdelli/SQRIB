import { objectToQueryString } from './queries.utils';
import { formatEmail, isTokenExpired } from './auth.utils';

describe('Server package utils', () => {
  it('Should turn an object to a query string', () => {
    const data = { foo: 'bar', baz: 'qux' };
    const expected = 'foo=\'bar\', baz=\'qux\'';
    expect(objectToQueryString(data)).toBe(expected);
  });

  beforeEach(() => {
    global.Date.now = jest.fn(() => 1600000000000);
  });

  const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

  it('Token should not be expired', () => {
    const expiresIn = ONE_WEEK_IN_SECONDS;
    const emittedAt = 1599999999000; // One sec before Date.now()

    const result = isTokenExpired(expiresIn, emittedAt);
    expect(result).toBeDefined();
    expect(result).toBe(false);
  });

  it('Token should not be expired', () => {
    const expiresIn = ONE_WEEK_IN_SECONDS;
    const emittedAt = 1599395201000; // One week before Date.now() + 1 sec
    const result = isTokenExpired(expiresIn, emittedAt);
    expect(result).toBeDefined();
    expect(result).toBe(false);
  });

  it('Token should be expired', () => {
    const expiresIn = ONE_WEEK_IN_SECONDS;
    const emittedAt = 1599395199000; // One week before Date.now() - 1 sec

    const result = isTokenExpired(expiresIn, emittedAt);
    expect(result).toBeDefined();
    expect(result).toBe(true);
  });

  it('Email should be in lowercase and trimed', () => {
    const mail = '   xXx-KeViN-RoXxOr-xXx@gmail.com        ';
    const result = formatEmail(mail);
    expect(result).toBeDefined();
    expect(result).toBe('xxx-kevin-roxxor-xxx@gmail.com');
  });
});
