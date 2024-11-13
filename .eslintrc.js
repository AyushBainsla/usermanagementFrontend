module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier', 'next'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'import'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
    "react/no-unknown-property": "off",
    "react/jsx-no-target-blank": "off",
    "no-undef": 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};


