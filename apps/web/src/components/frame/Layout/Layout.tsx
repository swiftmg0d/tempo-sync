import { Sidebar } from '../../features';
import { Background } from '../Background';

import * as L from './Layout.styled';

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Background />
			<Sidebar />
			<L.Layout.Main>{children}</L.Layout.Main>
		</>
	);
};
