import { Resource } from '@ikariam-abyssal-ambush-stats/types';

const RESOURCE_TRANSLATION: Record<Resource, string> = {
    BUILDING_MATERIAL: 'rakennusmateriaalia',
    WINE: 'viiniä',
    MARBLE: 'marmoria',
    CRYSTAL_GLASS: 'kristallilasia',
    SULPHUR: 'rikkiä',
    GOLD: 'kultaa',
};

export const translateResource = (resource: Resource): string => RESOURCE_TRANSLATION[resource];
