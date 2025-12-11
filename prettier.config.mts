import { type Config } from 'prettier';

const config: Config = {
    printWidth: 120,
    tabWidth: 4,
    singleQuote: true,
    jsxSingleQuote: true,
    bracketSameLine: false,

    plugins: ['@trivago/prettier-plugin-sort-imports'],

    importOrder: ['^((react)(.*)$)|^((react)$)', '<THIRD_PARTY_MODULES>', '^[./]'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};

export default config;
