import { Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import * as S from './ThemeToggle.styled';

import { useThemeStore } from '@/store';
import { theme } from '@/styles';

export const ThemeToggle = () => {
	const { mode, toggleTheme } = useThemeStore();
	const isDark = mode === 'dark';

	return (
		<S.ToggleButton
			onClick={toggleTheme}
			aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
		>
			<AnimatePresence mode='wait' initial={false}>
				<motion.div
					key={mode}
					initial={{ y: -12, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 12, opacity: 0 }}
					transition={{ duration: 0.15 }}
					style={{ display: 'flex' }}
				>
					{isDark ? (
						<Moon size={16} color={theme.colors.text.secondary} />
					) : (
						<Sun size={16} color={theme.colors.text.secondary} />
					)}
				</motion.div>
			</AnimatePresence>
		</S.ToggleButton>
	);
};
