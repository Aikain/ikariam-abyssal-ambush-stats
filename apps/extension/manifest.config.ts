import { defineManifest } from '@crxjs/vite-plugin';

import pkg from './package.json';

export default defineManifest({
    manifest_version: 3,
    name: 'Ikariam Abyssal Ambush Stats',
    version: pkg.version,
    description: 'Kerää syvyysväijytys taisteluraporttidataa Ikariamista.',
    icons: {
        48: 'public/icon48.png',
        128: 'public/icon128.png',
        256: 'public/icon256.png',
    },
    action: {
        default_icon: {
            48: 'public/icon48.png',
        },
        default_popup: 'src/popup/index.html',
    },
    host_permissions: ['https://*.ikariam.gameforge.com/*'],
    permissions: ['storage'],
    content_scripts: [
        {
            js: ['src/content/main.ts'],
            matches: ['https://*.ikariam.gameforge.com/*'],
        },
    ],
});
