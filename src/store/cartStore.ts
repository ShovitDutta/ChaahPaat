import { create } from "zustand";
type CartItem = {
    id: string;
    tag: string;
    name: string;
    note: string;
    emoji: string;
    origin: string;
    harvest: string;
    quantity: number;
    elevation: string;
    description: string;
};
type AnimationState = {
    isAnimating: boolean;
    fromPosition: { x: number; y: number } | null;
};
type CartState = {
    items: CartItem[];
    isStickyBarOpen: boolean;
    animation: AnimationState;
    clearCart: () => void;
    getCartTotal: () => number;
    getTotalItems: () => number;
    removeFromCart: (id: string) => void;
    setStickyBarOpen: (isOpen: boolean) => void;
    addToCart: (item: Omit<CartItem, "quantity">, position?: { x: number; y: number }) => void;
    updateQuantity: (id: string, quantity: number) => void;
    setAnimation: (animation: AnimationState) => void;
};

const useCartStore = create<CartState>((set, get) => ({
    items: [],
    isStickyBarOpen: false,
    animation: {
        isAnimating: false,
        fromPosition: null,
    },
    addToCart: (item, position) => {
        const existingItem = get().items.find((cartItem) => cartItem.id === item.id);
        if (position) {
            set({ animation: { isAnimating: true, fromPosition: position } });
            setTimeout(() => {
                set((state) => ({
                    animation: { ...state.animation, isAnimating: false },
                }));
            }, 1000);
        }
        if (existingItem) {
            set((state) => ({
                items: state.items.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
            }));
        } else {
            set((state) => ({
                items: [...state.items, { ...item, quantity: 1 }],
                isStickyBarOpen: true,
            }));
        }
    },
    removeFromCart: (id) => {
        set((state) => ({
            items: state.items.filter((item) => item.id !== id),
        }));
    },
    updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
            get().removeFromCart(id);
            return;
        }
        set((state) => ({
            items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        }));
    },
    setStickyBarOpen: (isOpen) => {
        set({ isStickyBarOpen: isOpen });
    },
    clearCart: () => {
        set({ items: [], isStickyBarOpen: false });
    },
    getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
    },
    getCartTotal: () => {
        return get().items.length;
    },
    setAnimation: (animation) => {
        set({ animation });
    },
}));
export default useCartStore;