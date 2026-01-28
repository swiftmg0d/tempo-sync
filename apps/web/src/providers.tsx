import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider } from '@emotion/react';
import { StrictMode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { GlobalStyles } from './GlobalStyles';
import { ErrorPage } from './components/ErrorPage';
import { QueryProvider } from './providers/QueryProvider';
import { theme } from './styles';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<StrictMode>
			<ChakraProvider value={defaultSystem}>
				<ThemeProvider theme={theme}>
					<GlobalStyles />
					<ErrorBoundary FallbackComponent={ErrorPage}>
						<QueryProvider>{children}</QueryProvider>
					</ErrorBoundary>
				</ThemeProvider>
			</ChakraProvider>
		</StrictMode>
	);
};
