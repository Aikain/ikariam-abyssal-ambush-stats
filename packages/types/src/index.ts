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

export type Resource = 'BUILDING_MATERIAL' | 'WINE' | 'MARBLE' | 'CRYSTAL_GLASS' | 'SULPHUR' | 'GOLD';

export interface SimpleReward {
    resource: Resource;
    size: number;
}

export interface Reward extends SimpleReward {
    count: number;
    date: string;
    playerName: string;
    server: string;
}
