module.exports = {
  plugins: ['jest-dom', 'unused-imports', 'prettier'],
  extends: ['next/core-web-vitals', 'plugin:jest-dom/recommended', 'plugin:tailwind/recommended', 'plugin:prettier/recommended', 'plugin:storybook/recommended'],
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  rules: {
    'no-unused-vars': 'off',
    'react/require-default-props': 0,
    'unused-imports/no-unused-imports': 'error',
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/react-in-jsx-scope': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'import/extensions': [
      'error',
      'never',
      {
        svg: 'always',
      },
    ],
    'react/no-unescaped-entities': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'react/no-unused-prop-types': 0,
    'no-underscore-dangle': 0,
    '@typescript-eslint/no-unused-vars': [
      0,
      {
        argsIgnorePattern: '^_',
      },
    ],
    'no-console': [
      2,
      {
        allow: ['warn', 'error'],
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
