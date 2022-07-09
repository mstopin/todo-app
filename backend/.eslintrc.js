module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: [
    "dist/**",
  ],
  "rules": {
    "semi": [2, "always"],
    "@typescript-eslint/no-explicit-any": "off"
  },
};
