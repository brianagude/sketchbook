import { create } from "zustand";

export const useGuessStore = create((set) => ({
  actualCount: 0,
  userGuess: null,
  gamePhase: 'guessing',
  
  setActualCount: (count) => set({ actualCount: count }),
  setUserGuess: (guess) => set({ userGuess: guess }),
  revealAnswer: () => set({ gamePhase: 'revealed' }),
  reset: () => set({ userGuess: null, gamePhase: 'guessing' }),
}));