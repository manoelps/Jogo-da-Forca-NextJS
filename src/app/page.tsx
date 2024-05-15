'use client';

import useHangman from '@/hooks/useHangman';
import { carrasco } from '@/mocks/carrasco';
import classNames from 'classnames';
import Image from 'next/image';

const Home = () => {
  const { letters, question, alfabeto, keyboard, gameReset, score, result } =
    useHangman();

  return (
    <main className="flex flex-col items-center justify-center lg:h-screen">
      <div className="flex flex-col items-center justify-center p-4 w-full bg-white rounded-md shadow shadow-neutral-800 lg:w-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2">
          <div className="flex items-center justify-center">
            <Image
              src={`/${carrasco[score].image}`}
              alt=""
              width={200}
              height={291}
              className="lg:min-w-[298.232px] lg:min-h-[291px] md:min-w-[298.232px] md:min-h-[291px]"
              priority
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-8 pt-4 w-full">
            <div className="flex justify-center flex-wrap gap-2 font-bold text-2xl text-white w-full">
              {letters.map((letra, index) => (
                <div
                  key={index}
                  className={classNames(
                    `border px-2 bg-neutral-100 text-purple-600`,
                    {
                      'bg-red-600/100 text-white/100': !result && score > 5
                    },
                    {
                      'bg-green-600/100 text-white/100': result && score < 6
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

            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-9 gap-2 justify-center">
              {alfabeto.map((alfabeto, index) => (
                <button
                  key={index}
                  className={classNames(
                    `flex items-center justify-center shadow-md border font-semibold text-white w-14 h-14 bg-purple-600 rounded-md hover:scale-95`,
                    { 'bg-slate-600 cursor-not-allowed': alfabeto.disabled }
                  )}
                  onClick={() => {
                    keyboard(alfabeto.letter);
                  }}
                  disabled={alfabeto.disabled}
                >
                  {alfabeto.letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center py-8 gap-3">
        <button
          onClick={gameReset}
          className={classNames(
            'px-8 py-3 lg:px-6 lg:py-2  md:px-6 md:py-2 bg-blue-600 text-white font-semibold rounded-md shadow',
            { 'bg-gray-400 cursor-not-allowed': !true }
          )}
        >
          PRÓXIMO DESAFIO
        </button>
      </div>
    </main>
  );
};

export default Home;
