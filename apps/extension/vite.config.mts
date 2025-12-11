import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import zip from 'vite-plugin-zip-pack';

import manifest from './manifest.config.js';

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        crx({ manifest }),
        zip({ outDir: 'release', outFileName: 'release.zip' }),
    ],
    server: {
        cors: {
            origin: [/chrome-extension:\/\//],
        },
    },
});
