module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'no-use-before-define': 0,
    'no-await-in-loop': 0,
    'no-continue': 0,
    'no-plusplus': 0,
    'no-var': 'error',
    'no-restricted-syntax': ['warn'],
    'class-methods-use-this': 0,
    'consistent-return': 0,
    'no-return-assign': ['error', 'except-parens'],
    'lines-between-class-members': 0,
    'import/prefer-default-export': 0,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-curly-newline': 0,
    'react/jsx-curly-brace-presence': 0,
    'react/no-array-index-key': 1,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-wrap-multilines': 0,
    'react/jsx-indent': 0,
    '@typescript-eslint/no-for-in-array': ['error'],
    'no-unused-vars': ['warn', { args: 'none' }],
    'no-useless-constructor': 0,
    'no-empty-function': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', 'tsx'] }],
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': ['error'],
    '@typescript-eslint/no-unsafe-argument': ['warn'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-unsafe-member-access': ['warn'],
    '@typescript-eslint/no-use-before-define': ['off'],
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/prefer-optional-chain': ['warn'],
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['~', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['yarn.lock'],
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
};
