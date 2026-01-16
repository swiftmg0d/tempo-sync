import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider } from '@emotion/react';
import { StrictMode } from 'react';

import { GlobalStyles } from './GlobalStyles';
import { QueryProvider } from './providers/QueryProvider';
import { theme } from './styles';

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
