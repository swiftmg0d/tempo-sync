import { create } from 'zustand';

import { darkTheme, lightTheme, setActiveTheme } from '@/styles';
import type { AppTheme } from '@/styles';

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
	isSidebarDragging: boolean;
	toggleSidebar: () => void;
	setSidebarOpen: (open: boolean) => void;
	setIsSidebarDragging: (dragging: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
	isSidebarOpen: false,
	isSidebarDragging: false,
	toggleSidebar: () => {
		set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
	},
	setSidebarOpen: (open) => {
		set({ isSidebarOpen: open });
	},
	setIsSidebarDragging: (dragging) => {
		set({ isSidebarDragging: dragging });
	}
}));

// Theme State

type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'tempo-sync-theme-mode';

const getInitialMode = (): ThemeMode => {
	try {
		const stored = localStorage.getItem(THEME_STORAGE_KEY);
		if (stored === 'light' || stored === 'dark') return stored;
	} catch {
		// localStorage unavailable
	}
	if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark';
	}
	return 'light';
};

interface ThemeState {
	mode: ThemeMode;
	themeObject: AppTheme;
	toggleTheme: () => void;
}

const initialMode = getInitialMode();
setActiveTheme(initialMode);

const applyTheme = (set: (fn: (state: ThemeState) => Partial<ThemeState>) => void) => {
	set((state) => {
		const newMode = state.mode === 'light' ? 'dark' : 'light';
		setActiveTheme(newMode);
		try {
			localStorage.setItem(THEME_STORAGE_KEY, newMode);
		} catch {
			// silently fail
		}
		return {
			mode: newMode,
			themeObject: (newMode === 'light' ? lightTheme : darkTheme) as AppTheme
		};
	});
};

export const useThemeStore = create<ThemeState>((set) => ({
	mode: initialMode,
	themeObject: (initialMode === 'light' ? lightTheme : darkTheme) as AppTheme,
	toggleTheme: () => {
		document.startViewTransition(() => {
			applyTheme(set);
		});
	}
}));
