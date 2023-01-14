const generateLetters = (numberOfLetters: number): Array<string> => {
  const getRandomIntInclusive = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const letters = [];

  for (let i = 0; i < numberOfLetters; i++) {
    letters.push(String.fromCharCode(getRandomIntInclusive(65, 90)));
  }

  return letters;
};

export { generateLetters };
