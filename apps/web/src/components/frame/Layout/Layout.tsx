import { useShallow } from 'zustand/shallow';

import { Background } from '../Background';

import * as L from './Layout.styled';

import { Sidebar } from '@/features';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useUIStore } from '@/store';
import { theme } from '@/styles';

export const Layout = ({ children }: { children: React.ReactNode }) => {
	const { isSidebarOpen, toggleSidebar } = useUIStore(
		useShallow((state) => ({
			isSidebarOpen: state.isSidebarOpen,
			toggleSidebar: state.toggleSidebar
		}))
	);
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
	return (
		<div style={{ position: 'relative', width: '100%', height: '100dvh' }}>
			<Background />
			<Sidebar />
			{isMobile && isSidebarOpen ? (
				// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
				<div
					onClick={toggleSidebar}
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: '70dvh',
						zIndex: 4
					}}
				/>
			) : null}
			<L.Layout.Main $isSidebarOpen={isSidebarOpen}>{children}</L.Layout.Main>
		</div>
	);
};
