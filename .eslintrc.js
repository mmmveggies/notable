module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    // named import/export keeps identifiers more consistant imo.
    "import/prefer-default-export": "off",

    // this module is unpublished so we won't fuss over this
    "import/no-extraneous-dependencies": "off",

    // typescript will handle these
    "no-unused-vars": "off",
    "import/no-unresolved": "off",

    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],

    // you break it, you buy it
    "react/jsx-props-no-spreading": "off"
  },
};
