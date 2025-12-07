import { useState } from "react";
import { useHangman } from "@/stores/hangman";
import { hangman } from "@/styles/design-tokens";

const CATEGORIES = ['animals', 'winter', 'food', 'space', 'nature', 'cities'];
const DIFFICULTIES = ['easy', 'medium', 'hard'];

export default function Interface() {
  const word = useHangman((s) => s.word);
  const category = useHangman((s) => s.category);
  const guesses = useHangman((s) => s.guesses);
  const strikes = useHangman((s) => s.strikes);
  const maxStrikes = useHangman((s) => s.maxStrikes);
  const phase = useHangman((s) => s.phase);
  const start = useHangman((s) => s.start);

  const [formData, setFormData] = useState({
    difficulty: 'easy',
    category: 'animals'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    start(formData.category, formData.difficulty);
  };

  const handleRandomize = () => {
    const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const randomDifficulty = DIFFICULTIES[Math.floor(Math.random() * DIFFICULTIES.length)];
    
    setFormData({
      category: randomCategory,
      difficulty: randomDifficulty
    });
  };

  return (
    <>
      {phase === "ready" && (
        <div className="fixed z-10 text-[#00171F] top-0 left-0 w-full p-4 flex flex-col gap-4">
          <form
            className="flex flex-col gap-3 max-w-sm bg-white p-4 rounded-xl"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-2">
              <label 
                htmlFor="difficulty-select" 
                className="font-semibold"
              >
                Difficulty:
              </label>
              <select
                name="difficulty"
                id="difficulty-select"
                className="w-full"
                value={formData.difficulty}
                onChange={handleChange}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="flex gap-2">
              <label 
                htmlFor="category-select" 
                className="font-semibold"
              >
                Category:
              </label>
              <select
                name="category"
                id="category-select"
                className="w-full"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="animals">Animals</option>
                <option value="winter">Winter</option>
                <option value="food">Food</option>
                <option value="space">Space</option>
                <option value="nature">Nature</option>
                <option value="cities">Cities</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button type="submit" className={hangman.button}>
                START
              </button>
              <button 
                type="button" 
                className={hangman.button}
                onClick={handleRandomize}
              >
                RANDOMIZE
              </button>
            </div>
          </form>
        </div>
      )}
      
      {(phase === "playing" || phase === "ended" || phase === "won") && (
        <div className="fixed z-10 text-[#00171F] top-0 left-0 w-full p-4">
          <div className="flex gap-4 justify-between items-center">
            <p className="text-3xl uppercase">{category}</p>
            <div className="flex gap-2">
              {renderStrikes(strikes, maxStrikes)}
            </div>
          </div>
          {word && (
            <div>
              <div className="flex gap-2 mx-auto w-fit">
                {createSpaces(word, guesses)}
              </div>
              <p className="text-center block mt-2 text-sm">
                Press <b>SPACE</b> to restart
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function renderStrikes(count, maxCount) {
  const blocks = [];

  for (let i = 0; i < maxCount; i++) {
    blocks.push(
      <div 
        key={i} 
        className={`rounded-sm aspect-square w-10 bg-white ${
          i < count ? 'opacity-100' : 'opacity-30'
        }`}
      />
    );
  }
  return blocks;
}

function createSpaces(word, guesses) {
  return word.split("").map((letter, index) => (
    <div
      // biome-ignore lint/suspicious/noArrayIndexKey: word letters never reorder
      key={`${letter}-${index}`}
      className="aspect-square w-14 p-2 border-b-2 border-[#00171F] flex items-center justify-center text-3xl"
    >
      {guesses.includes(letter.toLowerCase()) ? letter : ""}
    </div>
  ));
}