import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { Providers } from './providers.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
	<Providers>
		<App />
	</Providers>
);
