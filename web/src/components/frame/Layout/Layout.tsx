import { Background } from '../Background';
import { Sidebar } from '../../features';
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
