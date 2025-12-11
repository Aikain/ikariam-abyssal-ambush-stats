import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';

import baseConfig from './base';

export default defineConfig(
    baseConfig,

    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },

    react.configs.flat.recommended,
    react.configs.flat['jsx-runtime'],
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
);
