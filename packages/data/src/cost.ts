import { ResourceCost, Troop } from '@ikariam-abyssal-ambush-stats/types';

export const TROOP_COST: Record<Troop, ResourceCost & { citizen: number }> = {
    // Units
    HOPLITE: {
        wood: 40,
        sulphur: 30,
        citizen: 1,
    },
    STREAM_GIANT: {
        wood: 130,
        sulphur: 180,
        citizen: 2,
    },
    SPEARMAN: {
        wood: 30,
        citizen: 1,
    },
    SWORDSMAN: {
        wood: 30,
        sulphur: 30,
        citizen: 1,
    },
    SLINGER: {
        wood: 20,
        citizen: 1,
    },
    ARCHER: {
        wood: 30,
        sulphur: 25,
        citizen: 1,
    },
    SULPHYR_CARABINEER: {
        wood: 50,
        sulphur: 150,
        citizen: 1,
    },
    BATTERING_RAM: {
        wood: 220,
        citizen: 5,
    },
    CATAPULT: {
        wood: 260,
        sulphur: 300,
        citizen: 5,
    },
    MORTAR: {
        wood: 300,
        sulphur: 1250,
        citizen: 5,
    },
    GYROCOPTER: {
        wood: 25,
        sulphur: 100,
        citizen: 3,
    },
    BALLOON_BOMBARDIER: {
        wood: 40,
        sulphur: 250,
        citizen: 5,
    },
    COOK: {
        wood: 50,
        wine: 150,
        citizen: 1,
    },
    DOCTOR: {
        wood: 50,
        crystal: 450,
        citizen: 1,
    },
    SPARTAN: {
        wood: 40,
        sulphur: 40,
        citizen: 1,
    },

    // Ships
    FIRE_SHIP: {
        wood: 80,
        sulphur: 230,
        citizen: 4,
    },
    STEAM_RAM: {
        wood: 400,
        sulphur: 800,
        citizen: 2,
    },
    RAM_SHIP: {
        wood: 250,
        citizen: 3,
    },
    BALLISTA_SHIP: {
        wood: 180,
        sulphur: 160,
        citizen: 6,
    },
    CATAPULT_SHIP: {
        wood: 180,
        sulphur: 140,
        citizen: 5,
    },
    MORTAR_SHIP: {
        wood: 220,
        sulphur: 900,
        citizen: 5,
    },
    ROCKET_SHIP: {
        wood: 200,
        sulphur: 1200,
        citizen: 2,
    },
    DIVING_BOAT: {
        wood: 160,
        crystal: 750,
        sulphur: 100,
        citizen: 3,
    },
    PADDLE_SPEEDBOAT: {
        wood: 40,
        sulphur: 280,
        citizen: 1,
    },
    BALLOON_CARRIER: {
        wood: 700,
        sulphur: 700,
        citizen: 8,
    },
    TENDER: {
        wood: 300,
        crystal: 250,
        sulphur: 250,
        citizen: 7,
    },
};

export const TROOP_COST_MULTIPLIER: Record<string, { unit?: number; ship?: number }> = {
    's59-en': {
        unit: 2,
    },
    's70-en': {
        unit: 2,
    },
};

export const ResourceBackgroundUrl: Record<keyof ResourceCost | 'citizen', string> = {
    wood: 'icon_wood.png',
    wine: 'icon_wine.png',
    marble: 'icon_marble.png',
    crystal: 'icon_glass.png',
    sulphur: 'icon_sulfur.png',
    citizen: 'icon_citizen.png',
};
