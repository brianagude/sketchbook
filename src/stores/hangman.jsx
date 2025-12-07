import { create } from "zustand";
import { getRandomWord } from "@/data/words";

export const useHangman = create((set, get) => ({
  word: '',
  difficulty: '',
  category: '',
  guesses: [],
  correctGuesses: [],
  droppedLetters: [],
  strikes: 0,
  maxStrikes: 5,
  phase: "ready",

  getUniqueLetters: () => {
    const { word } = get();
    if (!word) return new Set();
    return new Set(word.toLowerCase().replace(/\s/g, '').split(''));
  },

  checkWin: () => {
    const { correctGuesses, getUniqueLetters, phase } = get();
    if (phase !== "playing") return;
    
    const uniqueLetters = getUniqueLetters();
    const correctSet = new Set(correctGuesses);
    
    if (uniqueLetters.size > 0 && uniqueLetters.size === correctSet.size) {
      set({ phase: "won" });
    }
  },

  addDroppedLetter: (letter) => 
    set((state) => ({ 
      droppedLetters: [...state.droppedLetters, letter] 
    })),

  addGuess: (letter) => {
    const { phase, guesses, word } = get();
    
    if (phase !== "playing") return;
    if (guesses.includes(letter)) return;

    const isCorrect = word.toLowerCase().includes(letter.toLowerCase());
    
    set((state) => ({
      guesses: [...state.guesses, letter],
      correctGuesses: isCorrect 
        ? [...state.correctGuesses, letter] 
        : state.correctGuesses,
      strikes: isCorrect ? state.strikes : state.strikes + 1
    }));

    setTimeout(() => get().checkWin(), 0);
  },

  /* PHASES */
  start: (category, difficulty) => {
    const state = get();
    if (state.phase !== "ready") return;

    const { word } = getRandomWord(category, difficulty);
    set({ 
      phase: "playing",
      word,
      difficulty,
      category,
      strikes: 0,
      guesses: [],
      correctGuesses: [],
      droppedLetters: [],
    });
  },

  restart: () => {
    const { phase } = get();
    if (phase === "playing" || phase === "ended" || phase === "won") {
      set({ phase: "ready" });
    }
  },

  end: () => {
    const { phase, strikes, maxStrikes } = get();
    if (phase === "playing" && strikes >= maxStrikes) {
      set({ phase: "ended" });
    }
  },
}))