import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import stylistic from '@stylistic/eslint-plugin';

export default [
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]
    },
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        languageOptions: {
            globals: globals.browser
        },
        plugins: {
            '@stylistic': stylistic
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            '@stylistic/indent': ['warn', 2],
            '@stylistic/semi': 'warn',
        }
    }
];