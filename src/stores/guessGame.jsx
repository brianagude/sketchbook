import { create } from 'zustand'

export const useGuessStore = create((set) => ({
  totalMarbles: 0,
  increaseTotalMarbles: () => set((state) => ({ totalMarbles: state.totalMarbles + 1 })),
}))