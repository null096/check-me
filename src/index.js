const checkMe = (text) => {
  if (typeof text !== 'string') {
    throw new Error('Text must be a string');
  }

  return {
    text
  };
}

export default checkMe;