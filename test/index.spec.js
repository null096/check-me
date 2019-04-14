import checkMe from '../src';

describe('CheckMe takes only a string', () => {
  const err = 'Text must be a string';

  it('With a string', () => {
    const text = 'my text';
    expect(() => new checkMe(text)).not.toThrowError(err);
  });
  it('Not with a string', () => {
    expect(() => new checkMe()).toThrowError(err);
    expect(() => new checkMe(3)).toThrowError(err);
    expect(() => new checkMe(false)).toThrowError(err);
    expect(() => new checkMe({})).toThrowError(err);
    expect(() => new checkMe(() => { })).toThrowError(err);
  });
});

describe('Throw error with empty strings', () => {
  const err = 'Text must contain at least one word';
  it('With empty string', () => {
    expect(() => new checkMe('')).toThrowError(err);
    expect(() => new checkMe('\r\t  \n  \t')).toThrowError(err);
  });
  it('With normal string', () => {
    expect(() => new checkMe('normal one')).not.toThrowError(err);
    expect(() => new checkMe('qwerty  \t')).not.toThrowError(err);
    expect(() => new checkMe(' \ralso fine \t')).not.toThrowError(err);
  })
});