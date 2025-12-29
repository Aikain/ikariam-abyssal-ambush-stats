import { RewardType } from '@ikariam-abyssal-ambush-stats/types';

const RESOURCE_TRANSLATION: Record<RewardType, string> = {
    BUILDING_MATERIAL: 'rakennusmateriaalia',
    WINE: 'viiniä',
    MARBLE: 'marmoria',
    CRYSTAL_GLASS: 'kristallilasia',
    SULPHUR: 'rikkiä',
    GOLD: 'kultaa',
    BRONSE_FLEECE: '',
    PREMIUM_TRADER: 'premium-myyjää',
    PREMIUM_ACCOUNT: 'päivää premiumtiliä',
    STEAM_CRYSTAL_DRILL: 'päivää höyrykristalliporaa',
    STEAM_DRIVEN_FORKLIFT: '???',
    STEAM_HAMMER: 'päivää höyryvasaraa',
    STEAM_SAW: 'päivää höyrysahaa',
    STEAM_SULPHUR_PADDLE_WHEEL: 'päivää höyrysiipiratasta',
    STEAM_WINE_PRESS: 'päivää höyryviinipuristinta',
    TOWN_RELOCATION: 'kaupungin siirtoa',
    TRITON_ENGINES: 'tritoon moottoria',
    TOWN_ICON: 'kaupungin kuvake',
};

export const translateResource = (resource: RewardType): string => RESOURCE_TRANSLATION[resource];
