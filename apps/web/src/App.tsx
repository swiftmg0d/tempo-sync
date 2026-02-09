import { Layout } from './components/frame';
import { Dashboard } from './features';
import { useThemeStore } from './store';

function App() {
	useThemeStore((state) => state.mode);

	return (
		<Layout>
			<Dashboard />
		</Layout>
	);
}
export default App;
