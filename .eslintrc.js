module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': 'off',
    'semi': 'off',
    'max-len': 'off',
    'no-console': 'off',
    'no-plusplus ': 'off',
    'arrow-parens': 'off',
    'consistent-return': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
