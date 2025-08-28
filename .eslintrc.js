module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'airbnb',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tests/*',],
    // project: ['./tsconfig.json'],
  },
  plugins: ['react', '@typescript-eslint', 'simple-import-sort', 'eslint-plugin-prettier'],
  rules: {
    'import/prefer-default-export': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'newline-before-return': 'warn',
    'react/jsx-uses-react': 'warn',
    'linebreak-style': 0,
    'max-len': [2, { code: 250 }],
    'jsx-a11y/label-has-associated-control': ['off'],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/default-param-last': ['off'],
    "jsx-a11y/no-autofocus": [ 2, {
      "ignoreNonDOM": true
    }],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'debug', 'dir'],
      },
    ],
    // "react/hook-use-state": [<enabled>, { "allowDestructuredState": <boolean> }]
    // "react/hook-use-state": ['warn', { "allowDestructuredState": true }]
  },
  overrides: [
    {
      files: ['webpack.config.js'],
      rules: {
        'typescript/no-var-requires': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.js'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
    {
      files: ['playwright.config.ts'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    }
  ],
};
