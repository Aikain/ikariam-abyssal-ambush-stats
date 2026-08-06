import { crx } from '@crxjs/vite-plugin';
import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

import manifest from './manifest.config.js';

export default defineConfig({
    plugins: [
        react(),
        babel({
            presets: [reactCompilerPreset()],
        }),
        svgr({
            include: '**/*.svg',
        }),
        crx({ manifest }),
    ],

    resolve: {
        tsconfigPaths: true,
    },

    server: {
        cors: {
            origin: [/chrome-extension:\/\//],
        },
    },
});
