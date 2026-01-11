import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider } from '@emotion/react';
import { StrictMode } from 'react';
import { theme } from './styles';
import { GlobalStyles } from './GlobalStyles';
import { QueryProvider } from './providers/QueryProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<StrictMode>
			<ChakraProvider value={defaultSystem}>
				<ThemeProvider theme={theme}>
					<GlobalStyles />
					<QueryProvider>{children}</QueryProvider>
				</ThemeProvider>
			</ChakraProvider>
		</StrictMode>
	);
};
