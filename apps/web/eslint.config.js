import rootConfig from '../../eslint.config.js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
	...rootConfig,
	react.configs.flat.recommended,
	react.configs.flat['jsx-runtime'],
	jsxA11y.flatConfigs.recommended,
	{
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh
		},
		settings: {
			react: { version: 'detect' }
		},
		rules: {
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

			'react/prop-types': 'off',
			'react/self-closing-comp': 'error',
			'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
			'react/jsx-boolean-value': ['error', 'never'],
			'react/jsx-no-useless-fragment': 'error',
			'react/hook-use-state': 'error',
			'react/jsx-pascal-case': 'error',
			'react/no-array-index-key': 'warn',
			'react/jsx-no-leaked-render': 'error',
			'react/display-name': 'off',

			'jsx-a11y/anchor-is-valid': 'warn'
		}
	}
];
