import { create } from 'zustand';

// Loading State

interface LoadingState {
	isLoading: boolean;
	toggleLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
	isLoading: false,
	toggleLoading: () => {
		set((state) => ({ isLoading: !state.isLoading }));
	}
}));

// ActiveScreen State

interface ActiveScreen {
	activeScreenIndex: number;
	setActiveScreenIndex: (index: number) => void;
}

export const useActiveScreenStore = create<ActiveScreen>((set) => ({
	activeScreenIndex: 0,
	setActiveScreenIndex: (index) => {
		set(() => ({ activeScreenIndex: index }));
	}
}));

// ActiveCard State

interface ActivityCardsState {
	activityId: string | null;
	isEmpty: boolean | null;
	setActiveCardId: (activityId: string | null) => void;
	setIsEmpty: (isEmpty: boolean) => void;
}

export const useActivityCardsStore = create<ActivityCardsState>((set) => ({
	activityId: null,
	isEmpty: null,
	setActiveCardId: (activityId) => {
		set({ activityId });
	},
	setIsEmpty: (isEmpty) => {
		set({ isEmpty });
	}
}));

interface UIState {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
	isSidebarOpen: false,
	toggleSidebar: () => {
		set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
	}
}));
