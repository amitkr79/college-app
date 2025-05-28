module.exports = {
  root: true,
  extends: [
    '@react-native', // Base React Native ESLint rules
    'plugin:prettier/recommended', // Enable Prettier integration
  ],
  plugins: ['prettier'],
  rules: {
    // Customize rules to reduce noise and improve DX
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ignore unused args with underscore
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'avoid',
        endOfLine: 'auto',
      },
    ],
    'react/react-in-jsx-scope': 'off', // Not needed for React 17+
    'no-console': 'off', // Allow console logs
  },
  env: {
    'react-native/react-native': true,
  },
};
