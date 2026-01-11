import { create } from 'zustand';

// Loading State

interface LoadingState {
	isLoading: boolean;
	toggleLoading: () => void;
}

export const useLoadingState = create<LoadingState>((set) => ({
	isLoading: false,
	toggleLoading: () => set((state) => ({ isLoading: !state.isLoading }))
}));

// ActiveScreen State

interface ActiveScreen {
	activeScreenIndex: number;
	setActiveScreenIndex: (index: number) => void;
}

export const useActiveScreenState = create<ActiveScreen>((set) => ({
	activeScreenIndex: 0,
	setActiveScreenIndex: (index) => set(() => ({ activeScreenIndex: index }))
}));

// ActiveCard State

interface ActivityCardsState {
	activeCardId: number | null;
	isEmpty: boolean | null;
	setActiveCardId: (cardId: number | null) => void;
	setIsEmpty: (isEmpty: boolean) => void;
}

export const useActivityCardsStore = create<ActivityCardsState>((set) => ({
	activeCardId: null,
	isEmpty: null,
	setActiveCardId: (cardId) => set({ activeCardId: cardId }),
	setIsEmpty: (isEmpty) => set({ isEmpty })
}));
