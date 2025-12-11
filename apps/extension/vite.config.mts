import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                content: 'src/content.ts',
                inject: 'src/inject.ts',
            },
            output: {
                entryFileNames: (assetInfo) => {
                    if (['content', 'inject'].indexOf(assetInfo.name) !== -1) return `${assetInfo.name}.js`;
                    return 'assets/[name].[hash].js';
                },
            },
        },
    },
});
