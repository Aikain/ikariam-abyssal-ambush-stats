export type Unit =
    | 'HOPLITE'
    | 'STREAM_GIANT'
    | 'SPEARMAN'
    | 'SWORDSMAN'
    | 'SLINGER'
    | 'ARCHER'
    | 'SULPHYR_CARABINEER'
    | 'BATTERING_RAM'
    | 'CATAPULT'
    | 'MORTAR'
    | 'GYROCOPTER'
    | 'BALLOON_BOMBARDIER'
    | 'COOK'
    | 'DOCTOR';

export type Ship =
    | 'FIRE_SHIP'
    | 'STEAM_RAM'
    | 'RAM_SHIP'
    | 'BALLISTA_SHIP'
    | 'CATAPULT_SHIP'
    | 'MORTAR_SHIP'
    | 'ROCKET_SHIP'
    | 'DIVING_BOAT'
    | 'PADDLE_SPEEDBOAT'
    | 'BALLOON_CARRIER'
    | 'TENDER';

export type Troop = Unit | Ship;

export interface Report {
    server: string;
    playerName: string;
    damage: number;
    date: string;
    troops: Partial<
        Record<
            Troop,
            {
                left: number;
                lost: number;
                strength: number;
            }
        >
    >;
}

export type RewardType =
    | 'BUILDING_MATERIAL'
    | 'WINE'
    | 'MARBLE'
    | 'CRYSTAL_GLASS'
    | 'SULPHUR'
    | 'GOLD'
    | 'BRONSE_FLEECE'
    | 'PREMIUM_TRADER'
    | 'STEAM_HAMMER'
    | 'STEAM_CRYSTAL_DRILL'
    | 'STEAM_SAW'
    | 'STEAM_SULPHUR_PADDLE_WHEEL'
    | 'STEAM_WINE_PRESS'
    | 'STEAM_DRIVEN_FORKLIFT'
    | 'TOWN_RELOCATION'
    | 'TRITON_ENGINES';

export interface SimpleReward {
    count: number;
    resource: RewardType;
    size: number;
}

export interface Reward extends SimpleReward {
    date: string;
    playerName: string;
    server: string;
}
