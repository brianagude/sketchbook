import { useState } from 'react';
import { useGuessStore } from "@/stores/guessGame"
import { howMany } from "@/styles/design-tokens";

export default function Interface() {
  const [inputValue, setInputValue] = useState('');
  const userGuess = useGuessStore((s) => s.userGuess);
  const actualCount = useGuessStore((s) => s.actualCount);
  const gamePhase = useGuessStore((s) => s.gamePhase);
  const setUserGuess = useGuessStore((s) => s.setUserGuess);
  const revealAnswer = useGuessStore((s) => s.revealAnswer);
  const reset = useGuessStore((s) => s.reset);

  const handleSubmit = () => {
    const guess = parseInt(inputValue);
    if (!isNaN(guess) && guess >= 0) {
      setUserGuess(guess);
      revealAnswer();
    }
  };

  const handleReset = () => {
    setInputValue('');
    reset();
  };

  const difference = userGuess !== null ? Math.abs(userGuess - actualCount) : 0;
  const percentOff = userGuess !== null 
    ? ((difference / actualCount) * 100).toFixed(1)
    : 0;

  return (
    <div className="absolute top-0 left-0 z-10 p-4 w-full">
      <div className="max-w-sm">
        {gamePhase === 'guessing' ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="guess" className="block mb-2 font-semibold sr-only">
                How many marbles are in the jar?
              </label>
              <input
                type="number"
                id="guess"
                name="guess"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={howMany.input}
                min={0}
                placeholder="how many marbles are in the jar?"
              />
            </div>
            <button
            type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 font-semibold transition"
            >
              Submit Guess
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-lg mb-2">Your Guess: <span className="font-bold">{userGuess}</span></p>
              <p className="text-lg mb-2">Actual Count: <span className="font-bold">{actualCount}</span></p>
              <p className="text-2xl font-bold mb-2">
                {difference === 0 ? '🎉 Perfect!' : `Off by ${difference}`}
              </p>
              <p className="text-slate-600">({percentOff}% error)</p>
            </div>
            
            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-slate-500 text-white py-2 px-4 rounded-lg hover:bg-slate-600 font-semibold transition"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
