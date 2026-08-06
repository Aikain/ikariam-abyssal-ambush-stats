import { crx } from '@crxjs/vite-plugin';
import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import manifest from './manifest.config.js';

export default defineConfig({
    plugins: [
        react(),
        babel({
            presets: [reactCompilerPreset()],
        }),
        crx({ manifest }),
    ],
    server: {
        cors: {
            origin: [/chrome-extension:\/\//],
        },
    },
});
