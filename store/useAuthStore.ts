import { create } from "zustand"
import { persist } from "zustand/middleware"



type AuthState = {
    user: Profile | null
    isAuthenticated: boolean
    setUser: (user: Profile) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            setUser: (user) => set({ user, isAuthenticated: true }),

            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: "auth-storage",
        }
    )
)