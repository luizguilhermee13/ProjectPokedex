import js from "@eslint/js";
import globals from "globals";

export default [
  // JavaScript do navegador
  {
    ...js.configs.recommended,
    files: ["assets/modules/**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        ...globals.browser,
      },
    },
  },

  // JavaScript do backend Node.js
  {
    ...js.configs.recommended,
    files: ["backend/**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",

      globals: {
        ...globals.node,
      },
    },
  },
];
