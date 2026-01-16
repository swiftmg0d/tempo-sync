import rootConfig from '../../eslint.config.js';

export default [
  ...rootConfig,
  {
    rules: {
      'no-console': 'off',

      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/promise-function-async': 'error',
    },
  },
];
