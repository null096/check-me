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
    this.typedFromText = 0;
    this.typedFromCurrentWord = 0;
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

  get allTyped() {
    return this.typedFromText + this.typedFromCurrentWord;
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
    const newTypedFromText = this.typedFromText + typedWordTrimmed.length;

    if (isTextFinished) {
      this.isError = false;
      this.isTextFinished = true;
      this.isShouldCleanInputValue = true;
      this.typedFromText = newTypedFromText;
      this.typedFromCurrentWord = 0;
      return;
    }

    if (isWordFinished) {
      this.isError = false;
      this.currentWordIndex++;
      this.isShouldCleanInputValue = true;
      // add 1, because of the space at the end
      this.typedFromText = newTypedFromText + 1;
      this.typedFromCurrentWord = 0;
      return;
    }

    if (!typedWord) {
      this.isError = false;
      this.isShouldCleanInputValue = false;
      this.typedFromCurrentWord = 0;
      return;
    }

    let isInputError = false;
    let correctlyTypedInCurrentWord = 0;
    for (let i = 0; i < typedWordTrimmed.length; i++) {
      if (currentWord[i] !== typedWordTrimmed[i]) {
        isInputError = true;
        break;
      }
      correctlyTypedInCurrentWord++;
    }
    this.typedFromCurrentWord = correctlyTypedInCurrentWord;

    if (isSpaceAtTheBeginnig || isSpaceAtTheEnd) {
      this.isError = true;
      this.isShouldCleanInputValue = false;
      return;
    }

    this.isError = isInputError;
    this.isShouldCleanInputValue = false;
  }
}

export default checkMe;