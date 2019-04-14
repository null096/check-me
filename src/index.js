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
    // reset variables for further checks
    this.isError = false;
    this.typedFromCurrentWord = 0;
    this.isShouldCleanInputValue = true;

    // Best cases, when the word/text finished or input is empty
    if (isTextFinished) {
      this.isTextFinished = true;
      this.typedFromText = newTypedFromText;
      return;
    }

    if (isWordFinished) {
      this.currentWordIndex++;
      // add 1, because of the space at the end
      this.typedFromText = newTypedFromText + 1;
      return;
    }

    this.isShouldCleanInputValue = false;

    if (!typedWord) {
      return;
    }

    // Worst cases, when the word is not fully typed or contains an error/spaces
    for (let i = 0; i < typedWordTrimmed.length; i++) {
      if (currentWord[i] !== typedWordTrimmed[i]) {
        this.isError = true;
        break;
      }
      this.typedFromCurrentWord++;
    }

    if (isSpaceAtTheBeginnig || isSpaceAtTheEnd) {
      this.isError = true;
      return;
    }
  }
}

export default checkMe;