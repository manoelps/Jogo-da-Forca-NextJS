export const getRadomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const extrairLetras = (word: string) => {
  return word
    .split('')
    .map(letter => ({ letter: letter.toUpperCase(), visibility: false }));
};
