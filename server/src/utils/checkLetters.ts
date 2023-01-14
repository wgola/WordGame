const checkLetters = (word: string, letters: Array<string>): boolean => {
  const word_copy = word.split("");
  const letters_copy = [...letters];

  word.split("").forEach((letter) => {
    const index = letters_copy.indexOf(letter);
    if (index >= 0) {
      letters_copy.splice(index, 1);
      const indexOfLetter = word_copy.indexOf(letter);
      word_copy.splice(indexOfLetter, 1);
    }
  });

  return word_copy.length === 0;
};

export { checkLetters };
