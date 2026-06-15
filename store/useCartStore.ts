// store/useCartStore.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type CartItem = {
    product_cart_id: number
    product_id: number
    product_detail_id: number
    title: string
    price: number
    quantity: number
    color: string
    size: string
    currency: string
    total: number
}

type CartState = {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (productCartId: number) => void
    updateQuantity: (productCartId: number, quantity: number) => void
    clearCart: () => void
    getTotal: () => number
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) =>
                set((state) => {
                    const exists = state.items.find(
                        (i) => i.product_cart_id === item.product_cart_id
                    )

                    if (exists) {
                        return {
                            items: state.items.map((i) =>
                                i.product_cart_id === item.product_cart_id
                                    ? { ...i, quantity: i.quantity + item.quantity }
                                    : i
                            ),
                        }
                    }

                    return { items: [...state.items, item] }
                }),

            removeItem: (productCartId) =>
                set((state) => ({
                    items: state.items.filter(
                        (i) => i.product_cart_id !== productCartId
                    ),
                })),

            updateQuantity: (productCartId, quantity) =>
                set((state) => ({
                    items: state.items.map((i) =>
                        i.product_cart_id === productCartId
                            ? { ...i, quantity }
                            : i
                    ),
                })),

            clearCart: () => set({ items: [] }),

            getTotal: () =>
                get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        }),
        {
            name: "cart-storage", 
        }
    )
)