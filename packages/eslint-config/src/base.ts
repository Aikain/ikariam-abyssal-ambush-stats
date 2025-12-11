import js from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import turbo from 'eslint-plugin-turbo';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
    js.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    turbo.configs['flat/recommended'],

    // This must be the last one
    prettier,
);
