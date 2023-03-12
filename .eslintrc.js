module.exports = {
  env: {
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: "latest"
  },
  extends: [
    "eslint:recommended"
  ],
  rules: {
    "max-len": ["error", { "code": 150 }],
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    "comma-dangle": ["error", "never"],
    "arrow-parens": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "space-in-parens": ["error", "never"],
    "template-curly-spacing": ["error", "never"],
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
};
