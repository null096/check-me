import checkMe from '../src';

describe('CheckMe takes only a string', () => {
  it('With a string', () => {
    const text = 'my text';
    expect(checkMe(text)).toEqual({ text });
  });
  it('Not with a string', () => {
    const err = 'Text must be a string';
    expect(() => checkMe()).toThrowError(err);
    expect(() => checkMe(3)).toThrowError(err);
    expect(() => checkMe(false)).toThrowError(err);
    expect(() => checkMe({})).toThrowError(err);
    expect(() => checkMe(() => { })).toThrowError(err);
  });
});