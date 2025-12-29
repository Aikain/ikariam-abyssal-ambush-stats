import { RewardType, SimpleReward } from '@ikariam-abyssal-ambush-stats/types';

export const convertDateToISOString = (date: Date, timeZone = 'Europe/Berlin'): string => {
    date.setHours(
        date.getHours() +
            Math.round((Date.now() - Date.parse(new Date().toLocaleString('sv', { timeZone }))) / 3600000),
    );
    return date.toISOString();
};

const RESOURCE_MAP: Record<string, RewardType> = {
    Rakennusmateriaali: 'BUILDING_MATERIAL',
    Viini: 'WINE',
    Marmori: 'MARBLE',
    Kristallilasi: 'CRYSTAL_GLASS',
    Rikki: 'SULPHUR',
    Kulta: 'GOLD',
    Höyrysaha: 'STEAM_SAW',
    Höyryviinipuristin: 'STEAM_WINE_PRESS',
    Höyryvasara: 'STEAM_HAMMER',
    Höyrykristallipora: 'STEAM_CRYSTAL_DRILL',
    Höyrysiipiratas: 'STEAM_SULPHUR_PADDLE_WHEEL',
    'Triton moottorit': 'TRITON_ENGINES',
    'Premium-myyjä': 'PREMIUM_TRADER',
    Premiumtili: 'PREMIUM_ACCOUNT',
    'Kaupungin siirtäminen': 'TOWN_RELOCATION',

    // TODO
    TODO_1: 'BRONSE_FLEECE',
    TODO_4: 'STEAM_DRIVEN_FORKLIFT',
};

const SIZE_MAP: Record<string, number> = {
    Minimaalinen: 1_000,
    Pieni: 10_000,
    Normaali: 25_000,
    Suuri: 100_000,
    Massiivinen: 250_000,
    '500k': 500_000,
    '1M': 1_000_000,
};

export const parseReward = (subject: string, img?: string): SimpleReward => {
    if (img === 'Kylän kuvake: Tapahtuma')
        return {
            count: 1,
            size: 1,
            resource: 'TOWN_ICON',
        };

    const [, count, reward] = subject.match(/Vastaanotat (\d+)(.*) palkinnoksi/) ?? [];
    const [, resource, size] = reward.replace(/Resurssilähetys: /, '').match(/(.*) \(([\d\w]+).*\)/) ?? [];

    return {
        count: parseInt(count),
        size: size ? (SIZE_MAP[size] ?? parseInt(size)) : 1,
        resource: RESOURCE_MAP[resource ?? reward],
    };
};
