/* eslint-disable import/no-commonjs */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  extends: [
    'airbnb-typescript', // with react
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'import'],
  rules: {
    'import/no-commonjs': 'warn', //es6
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-unused-vars': 'warn',
  },
  settings: {
    'import/extensions': ['.js', '.ts', '.mjs'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.json'],
        paths: ['src'], 
      },
    },
  },
  ignorePatterns: ['node_modules', 'dist', 'static'],
};