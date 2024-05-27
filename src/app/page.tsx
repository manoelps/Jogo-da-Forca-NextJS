'use client';

import useHangman from '@/hooks/useHangman';
import { carrasco } from '@/mocks/carrasco';
import classNames from 'classnames';
import Image from 'next/image';

const Home = () => {
  const {
    letters,
    question,
    alphabetLetters,
    keyboard,
    gameReset,
    score,
    result
  } = useHangman();

  return (
    <main className="flex flex-col items-center justify-center lg:h-screen">
      <div className="flex flex-col items-center justify-center p-4 w-full bg-white rounded-md lg:shadow lg:w-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2">
          <div className="flex items-center justify-center">
            <Image
              src={`/${carrasco[score].image}`}
              alt=""
              width={130}
              height={291}
              className="lg:min-w-[298.232px] lg:min-h-[291px] md:min-w-[298.232px] md:min-h-[291px]"
              priority
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-4 pt-4 w-full">
            <div className="flex justify-center flex-wrap gap-1 font-bold text-2xl text-white w-full">
              {letters.map((letra, index) => (
                <div
                  key={index}
                  className={classNames(
                    `border px-2 text-purple-600 md:px-3 lg:px-3`,
                    {
                      'bg-red-600 text-white/100': !result && score > 5
                    },
                    {
                      'bg-green-600 text-white/100': result
                    }
                  )}
                >
                  {letra.visibility ? letra.letter : '-'}
                </div>
              ))}
            </div>
            <div className="font-medium bg-purple-600 p-4 border rounded shadow-md text-white">
              {question?.pista}
            </div>
            <div className="font-semibold text-purple-600 text-lg">
              Tentativas restantes: {score} / 6
            </div>

            <div className="relative">
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-9 gap-2 justify-center">
                {alphabetLetters.map((alphabet, index) => (
                  <button
                    key={index}
                    className={classNames(
                      `flex items-center justify-center shadow-md border font-semibold text-white w-14 h-14 bg-purple-600 rounded-md hover:scale-95`,
                      { 'bg-slate-600 cursor-not-allowed': alphabet.disabled }
                    )}
                    onClick={() => {
                      keyboard(alphabet.letter);
                    }}
                    disabled={alphabet.disabled}
                  >
                    {alphabet.letter}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-end right-0 bottom-1 absolute lg:hidden md:hidden">
                <button
                  onClick={gameReset}
                  className={classNames(
                    'px-8 py-3 lg:px-6 lg:py-2  md:px-6 md:py-2 bg-[#56BAEC] text-white font-semibold rounded-md shadow hover:scale-95'
                  )}
                >
                  PRÓXIMO DESAFIO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full hidden lg:flex md:flex items-center justify-center py-8 gap-3">
        <button
          onClick={gameReset}
          className={classNames(
            'px-8 py-3 lg:px-6 lg:py-2  md:px-6 md:py-2 bg-purple-600/70 text-white font-semibold rounded-md shadow hover:scale-95'
          )}
        >
          PRÓXIMO DESAFIO
        </button>
      </div>
    </main>
  );
};

export default Home;
