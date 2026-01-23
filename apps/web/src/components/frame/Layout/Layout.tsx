import { useShallow } from 'zustand/shallow';

import { Background } from '../Background';

import * as L from './Layout.styled';

import { Sidebar } from '@/features';
import { useUIStore } from '@/store';

export const Layout = ({ children }: { children: React.ReactNode }) => {
	const { isSidebarOpen, toggleSidebar } = useUIStore(
		useShallow((state) => ({
			isSidebarOpen: state.isSidebarOpen,
			toggleSidebar: state.toggleSidebar
		}))
	);
	return (
		<div style={{ position: 'relative', width: '100dvw', height: '100dvh' }}>
			<Background />
			<Sidebar />
			<L.Layout.Main
				$isSidebarOpen={isSidebarOpen}
				onClick={() => {
					if (isSidebarOpen) {
						toggleSidebar();
					}
				}}
			>
				{children}
			</L.Layout.Main>
		</div>
	);
};
