import { extrairLetras, getRadomNumber } from '@/helpers/helper';
import { alphabet } from '@/mocks/alfabeto';
import { questions } from '@/mocks/questions';
import { AlfabetoProps, LetterProps, QuestionProps } from '@/types/types';
import { useEffect, useState } from 'react';

const useHangman = () => {
  const [question, setQuestion] = useState<QuestionProps>();
  const [letters, setLetters] = useState<LetterProps[]>([]);
  const [alphabetLetters, setAlfabeto] = useState<AlfabetoProps[]>(alphabet);
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

    setAlfabeto(resetKeyboard);
  };

  //pesquisa a letra escolhida
  const checkLetterInResponse = (letter: string) => {
    const foundLetter = letters.find(element => element.letter === letter);
    if (!foundLetter) {
      setScore(prevScore => prevScore + 1);
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

    setAlfabeto(newAlphabet);
    checkLetterInResponse(letter);
  };

  //GAME OVER
  const disableKeyboard = () => {
    if (score > 5) {
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

      const disabledKeyboard = alphabetLetters.map(
        (keyboard: AlfabetoProps) => {
          return { ...keyboard, disabled: true };
        }
      );

      setAlfabeto(disabledKeyboard);
      setResult(false);
    }
  };

  useEffect(() => {
    selectRandomQuestion(questions);
  }, []);

  useEffect(() => {
    disableKeyboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  useEffect(() => {
    const findAllLetter = letters.filter(
      item => item.visibility === true
    ).length;

    if (findAllLetter === letters.length && letters.length > 0 && score < 6) {
      //   console.log('PARABENS');
      setResult(true);

      const disabledKeyboard = alphabetLetters.map(
        (keyboard: AlfabetoProps) => {
          return { ...keyboard, disabled: true };
        }
      );

      setAlfabeto(disabledKeyboard);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letters]);

  return {
    letters,
    question,
    alfabeto: alphabetLetters,
    keyboard,
    gameReset,
    score,
    result
  };
};

export default useHangman;
