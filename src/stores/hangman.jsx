import { create } from "zustand";
import { getRandomWord } from "@/data/words"

export const useHangman = create((set) => ({
  word: '',
  difficulty: '',
  category: '',
  guesses: [],
  correctGuesses: [],
  strikes: 0,
  droppedLetters: [],
  snowCount: 1000,
  phase: "ready",

  increaseSnowCount: () => set((state) => ({ snowCount: state.snowCount + 1000 })),
  addDroppedLetters: (letter) => set((state) => ({ droppedLetters: [...state.droppedLetters, letter] })),
  increaseStrikes: () => set((state) => ({ strikes: state.strikes + 1 })),
  addGuess: (letter) => set((state) => ({ guesses: [...state.guesses, letter] })),
  generateWord: () => {
    const { word, difficulty, category } = getRandomWord();
    set({ word, difficulty, category });
  },

  /* PHASES */
  start: () => {
    set((state) => {
      if (state.phase === "ready") {
        const { word, difficulty, category } = getRandomWord();
        return { 
          phase: "playing",
          word,
          difficulty,
          category,
          strikes: 0,
          snowCount: 1000,
          guesses: [],
          correctGuesses: [],
          droppedLetters: [],
        };
      }
      return {};
    });
  },

  restart: () => {
    set((state) => {
      if (state.phase === "playing" || state.phase === "ended")
        return { phase: "ready" };
      return {};
    });
  },

  end: () => {
    set((state) => {
      if (state.phase === "playing")
        return { phase: "ended" };
      return {};
    });
  },
}))