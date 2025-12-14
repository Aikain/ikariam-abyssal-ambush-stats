import { Resource, SimpleReward } from '@ikariam-abyssal-ambush-stats/types';

export const convertDateToISOString = (date: Date, timeZone = 'Europe/Berlin'): string => {
    date.setHours(
        date.getHours() +
            Math.round((Date.now() - Date.parse(new Date().toLocaleString('sv', { timeZone }))) / 3600000),
    );
    return date.toISOString();
};

const RESOURCE_MAP: Record<string, Resource> = {
    Rakennusmateriaali: 'BUILDING_MATERIAL',
    Viini: 'WINE',
    Marmori: 'MARBLE',
    Kristallilasi: 'CRYSTAL_GLASS',
    Rikki: 'SULPHUR',
    Kulta: 'GOLD',
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

export const parseReward = (reward: string): SimpleReward => {
    const [, resource, size] = reward.replace(/Resurssilähetys: /, '').match(/(\w+) \((\w+)\)/) ?? [];
    return {
        size: SIZE_MAP[size],
        resource: RESOURCE_MAP[resource],
    };
};
