import { extrairLetras, getRadomNumber } from '@/helpers/helper';
import { alphabet } from '@/mocks/alfabeto';
import { questions } from '@/mocks/questions';
import { AlfabetoProps, LetterProps, QuestionProps } from '@/types/types';
import { useEffect, useState } from 'react';

const useHangman = () => {
  const [question, setQuestion] = useState<QuestionProps>();
  const [letters, setLetters] = useState<LetterProps[]>([]);
  const [alphabetLetters, setAlphabet] = useState<AlfabetoProps[]>(alphabet);
  const [score, setScore] = useState<number>(0);
  const [result, setResult] = useState<boolean | null>(null);

  const selectRandomQuestion = (questions: QuestionProps[]) => {
    const randomIndex = getRadomNumber(questions.length);
    setQuestion(questions[randomIndex]);
    setLetters(extrairLetras(questions[randomIndex].resposta));
  };

  const gameReset = () => {
    setScore(0);
    setResult(false);
    selectRandomQuestion(questions);
    const resetKeyboard = alphabetLetters.map((keyboard: AlfabetoProps) => {
      return { ...keyboard, disabled: false };
    });

    setAlphabet(resetKeyboard);
  };

  //pesquisa a letra escolhida
  const checkLetterInResponse = (letter: string) => {
    const foundLetter = letters.find(element => element.letter === letter);
    if (!foundLetter) {
      setScore(prevScore => prevScore + 1);
      gameOver();
    }
  };

  const keyboard = (letter: string) => {
    const viewWord = letters.map((item: LetterProps) => {
      if (item.letter === letter) {
        return { ...item, visibility: true };
      }

      return item;
    });

    setLetters(viewWord);
    const newAlphabet = alphabetLetters.map((keyboard: AlfabetoProps) => {
      if (keyboard.letter === letter) {
        return { ...keyboard, disabled: true };
      }
      return keyboard;
    });

    setAlphabet(newAlphabet);
    checkLetterInResponse(letter);
    checkWin(viewWord);
  };

  //GAME OVER
  const gameOver = () => {
    if (score >= 5) {
      const message = [
        {
          pista: '',
          resposta: 'GAMEOVER'
        }
      ];
      const viewWord = extrairLetras(message[0].resposta).map(
        (letter: LetterProps) => {
          return { ...letter, visibility: true };
        }
      );
      setLetters(viewWord);
      disableKeyboard();

      setResult(false);
    }
  };

  const disableKeyboard = () => {
    const disabledKeyboard = alphabetLetters.map((keyboard: AlfabetoProps) => {
      return { ...keyboard, disabled: true };
    });

    setAlphabet(disabledKeyboard);
  };

  const checkWin = (viewWord: LetterProps[]) => {
    const findAllLetter = viewWord.filter(
      item => item.visibility === true
    ).length;

    if (findAllLetter === letters.length && letters.length > 0 && score < 6) {
      //   console.log('PARABENS');
      setResult(true);
      disableKeyboard();
    }
  };

  useEffect(() => {
    selectRandomQuestion(questions);
  }, []);

  return {
    letters,
    question,
    alphabetLetters,
    keyboard,
    gameReset,
    score,
    result
  };
};

export default useHangman;
