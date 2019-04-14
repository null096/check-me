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
    this.isTextFinished = false;
    this.isShouldCleanInputValue = false;
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

  onInput = (typedWord) => {
    const {
      currentWordIndex,
      textParts
    } = this;
    const currentWord = textParts[currentWordIndex];
    const typedWordTrimmed = typedWord.trim();
    const isSpaceAtTheBeginnig = /^\s/.test(typedWord);
    const isSpaceAtTheEnd = /\s$/.test(typedWord);
    const isExactSameWords = typedWordTrimmed === currentWord;
    const isLastWord = textParts.length - 1 === currentWordIndex;
    const isWordsOk = isExactSameWords && !isSpaceAtTheBeginnig;
    const isWordFinished = isWordsOk && isSpaceAtTheEnd;
    const isTextFinished = isWordsOk && isLastWord;

    if (isTextFinished) {
      this.isError = false;
      this.isTextFinished = true;
      this.isShouldCleanInputValue = true;
      return;
    }

    if (isWordFinished) {
      this.isError = false;
      this.currentWordIndex++;
      this.isShouldCleanInputValue = true;
      return;
    }

    if (!typedWord) {
      this.isError = false;
      this.isShouldCleanInputValue = false;
      return;
    }

    if (isSpaceAtTheBeginnig || isSpaceAtTheEnd) {
      this.isError = true;
      this.isShouldCleanInputValue = false;
      return;
    }

    for (let i = 0; i < typedWordTrimmed.length; i++) {
      if (currentWord[i] !== typedWord[i]) {
        this.isError = true;
        this.isShouldCleanInputValue = false;
        return;
      }
    }

    this.isError = false;
    this.isShouldCleanInputValue = false;
  }
}

export default checkMe;