class checkMe {
  constructor(text) {
    this.setTextData(text);
  }

  setTextData(text) {
    this.validateText(text);

    this.text = text.trim();
    this.textParts = this.text.split(/\s+/);
    this.textSeparators = this.text.match(/\s+/g);
    this.currentWordIndex = 0;
    this.isError = false;
  }

  validateText(text) {
    if (typeof text !== 'string') {
      throw new Error('Text must be a string');
    }
    text = text.trim();
    if (!text) {
      throw new Error('Text must contain at least one word');
    }

    return true;
  }
}

export default checkMe;