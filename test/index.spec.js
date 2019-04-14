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
  });
});

describe('onInput works fine', () => {
  const text = 'my text';
  it('isError works fine', () => {
    const c = new checkMe(text);
    c.onInput('');
    expect(c.isError).toBeFalsy();
    c.onInput(' ');
    expect(c.isError).toBeTruthy();
    c.onInput('');
    expect(c.isError).toBeFalsy();
    c.onInput('m');
    expect(c.isError).toBeFalsy();
    c.onInput('my');
    expect(c.isError).toBeFalsy();
    c.onInput(' my');
    expect(c.isError).toBeTruthy();
    c.onInput(' my ');
    expect(c.isError).toBeTruthy();
    c.onInput('my');
    expect(c.isError).toBeFalsy();
    c.onInput('myX');
    expect(c.isError).toBeTruthy();
    c.onInput('my ');
    expect(c.isError).toBeFalsy();
    c.onInput('t');
    expect(c.isError).toBeFalsy();
    c.onInput('tex');
    expect(c.isError).toBeFalsy();
    c.onInput('texx');
    expect(c.isError).toBeTruthy();
    c.onInput('test ');
    expect(c.isError).toBeTruthy();
    c.onInput(' test ');
    expect(c.isError).toBeTruthy();
    c.onInput('text');
    expect(c.isError).toBeFalsy();
  });
  it('currentWordIndex works fine', () => {
    const c = new checkMe(text);
    c.onInput(' my ');
    expect(c.currentWordIndex).toBe(0);
    c.onInput('my ');
    expect(c.currentWordIndex).toBe(1);
    c.onInput('text!');
    expect(c.currentWordIndex).toBe(1);
    c.onInput('text');
    expect(c.currentWordIndex).toBe(1);
  });
  it('isTextFinished works fine', () => {
    const c = new checkMe(text);
    c.onInput(' my ');
    expect(c.isTextFinished).toBeFalsy();
    c.onInput('my ');
    expect(c.isTextFinished).toBeFalsy();
    c.onInput(' text');
    expect(c.isTextFinished).toBeFalsy();
    c.onInput('text');
    expect(c.isTextFinished).toBeTruthy();
  });
  it('isShouldCleanInputValue workd fine', () => {
    const c = new checkMe(text);
    c.onInput('my');
    expect(c.isShouldCleanInputValue).toBeFalsy();
    c.onInput('my');
    expect(c.isShouldCleanInputValue).toBeFalsy();
    c.onInput('my ');
    expect(c.isShouldCleanInputValue).toBeTruthy();
    c.onInput('');
    expect(c.isShouldCleanInputValue).toBeFalsy();
    c.onInput('t');
    expect(c.isShouldCleanInputValue).toBeFalsy();
    c.onInput('te');
    expect(c.isShouldCleanInputValue).toBeFalsy();
    c.onInput('tex');
    expect(c.isShouldCleanInputValue).toBeFalsy();
    c.onInput('text');
    expect(c.isShouldCleanInputValue).toBeTruthy();
  });
  it('typedFromText workd fine', () => {
    const c = new checkMe(text);
    c.onInput('');
    expect(c.typedFromText).toBe(0);
    c.onInput('m');
    expect(c.typedFromText).toBe(0);
    c.onInput(' m');
    expect(c.typedFromText).toBe(0);
    c.onInput('my');
    expect(c.typedFromText).toBe(0);
    c.onInput('myX');
    expect(c.typedFromText).toBe(0);
    c.onInput('my ');
    expect(c.typedFromText).toBe(3);
    c.onInput('tex');
    expect(c.typedFromText).toBe(3);
    c.onInput('text');
    expect(c.typedFromText).toBe(7);
  });
  it('typedFromCurrentWord works fine', () => {
    const c = new checkMe(text);
    c.onInput('');
    expect(c.typedFromCurrentWord).toBe(0);
    c.onInput('m');
    expect(c.typedFromCurrentWord).toBe(1);
    c.onInput(' m');
    expect(c.typedFromCurrentWord).toBe(1);
    c.onInput('my');
    expect(c.typedFromCurrentWord).toBe(2);
    c.onInput('myX');
    expect(c.typedFromCurrentWord).toBe(2);
    c.onInput('my ');
    expect(c.typedFromCurrentWord).toBe(0);
    c.onInput('tex');
    expect(c.typedFromCurrentWord).toBe(3);
    c.onInput('text');
    expect(c.typedFromCurrentWord).toBe(0);
  });
  it('allTyped works fine', () => {
    const c = new checkMe(text);
    c.onInput('');
    expect(c.allTyped).toBe(0);
    c.onInput('m');
    expect(c.allTyped).toBe(1);
    c.onInput(' m');
    expect(c.allTyped).toBe(1);
    c.onInput(' xm');
    expect(c.allTyped).toBe(0);
    c.onInput('my');
    expect(c.allTyped).toBe(2);
    c.onInput('myX');
    expect(c.allTyped).toBe(2);
    c.onInput('X my');
    expect(c.allTyped).toBe(0);
    c.onInput('my ');
    expect(c.allTyped).toBe(3);
    c.onInput('tex');
    expect(c.allTyped).toBe(6);
    c.onInput('text');
    expect(c.allTyped).toBe(7);
  });
});
