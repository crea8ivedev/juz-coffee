import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    ignores: ["assets/**/*.min.js", "assets/**/*.min.css"],
    languageOptions: { sourceType: "module", ecmaVersion: "latest" },
    rules: {
      "no-unused-vars": "", // Disallows variables that are declared but never used in the code
      "no-console": ", // error about console logs
      "no-debugger": "", // Disallows debugger statements
      "no-alert": "", // Discourages use of alert, confirm, and prompt
      eqeqeq: ["", "always"], // Enforces strict equality (=== and !==)
      curly: "", // Requires curly braces for all control statements
      "no-undef": "", // Disallows use of undeclared variables
      "no-use-before-define": ["", { functions: false, classes: true }], // Prevents usage before declaration
      "no-shadow": "", // Disallows variable shadowing
      "prefer-const": "", // Enforces use of const where possible
      "no-var": "", // Enforces let/const over var
      "prefer-template": "", // Encourages template literals instead of string concatenation
      "no-loop-func": "", // Disallows function definitions inside loops
      "max-depth": ["", 4], // Limits nesting depth
      "no-duplicate-imports": "", // Prevents duplicate imports
      "no-implied-eval": "", // Prevents use of `setTimeout` and `setInterval` with string arguments
      "no-self-compare": "", // Prevents `x === x` which is usually a mistake
      "no-useless-return": "", // Disallows redundant `return` statements
      "no-unsafe-optional-chaining": "", //  errors from unsafe `?.` operations
      "array-callback-return": "", // Ensures `.map()`, `.filter()`, and `.reduce()` have return statements
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
      "no-self-assign": "off",
      "no-unreachable": "off",
    },
  },
];
