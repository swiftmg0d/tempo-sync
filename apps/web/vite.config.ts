import path from 'path';

import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
	plugins: [
		react({
			jsxImportSource: '@emotion/react',
			babel: {
				plugins: ['@emotion/babel-plugin']
			}
		}),

		tsconfigPaths(),
		visualizer({
			open: true,
			filename: 'stats.html',
			gzipSize: true,
			brotliSize: true
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	build: {
		sourcemap: true,
		minify: 'terser',
		cssCodeSplit: true,
		rollupOptions: {
			output: {
				manualChunks: {
					query: ['@tanstack/react-query'],
					'react-vendor': ['react', 'react-dom'],
					motion: ['motion'],
					emotion: ['@emotion/react', '@emotion/styled']
				}
			}
		}
	},
	esbuild: {
		drop: mode === 'production' ? ['console', 'debugger'] : []
	}
}));
