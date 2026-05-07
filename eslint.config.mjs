import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
  {
    ignores: ["node_modules/**", "dist/**", "coverage/**"],
  },
  {
    // Permite globals do Node em arquivos de configuração (vite, rollup etc.) para o ESLint não acusar require/module
    files: ["vite.config.js", "vite.config.*", "**/*.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    rules: {
      // Code quality: força uso de const/let, nunca var
      "no-var": "error",
      "prefer-const": "warn",

      // Code quality: detecta código não utilizado
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Code quality: evita console.log em produção
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],

      // Code organization: força imports em ordem alfabética
      "sort-imports": [
        "warn",
        {
          ignoreCase: true,
          ignoreDeclarationSort: false,
        },
      ],

      // Code quality: evita lógica desnecessária
      "no-unreachable": "error",
      "no-duplicate-imports": "error",
    },
  },
  prettier,
];
