import { create } from 'zustand'

interface FavouriteStore {
    count: number
    setCount: (count: number) => void
    increment: () => void
    decrement: () => void
}

export const FavouriteStore = create<FavouriteStore>((set) => ({
    count: 0,
    setCount: (count) => set({ count }),
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: Math.max(0, state.count - 1) })),
}))