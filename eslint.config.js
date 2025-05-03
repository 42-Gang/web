import { config } from '@hakui/eslint-config/vite';

/** @type {import('eslint').Linter.Config} */
export default [
  ...config,
  { rules: { 'react/no-unknown-property': ['error', { ignore: ['css'] }] } },
];
