import { Ship, Unit } from '@ikariam-abyssal-ambush-stats/data';

export type Unit = (typeof Unit)[keyof typeof Unit];

export type Ship = (typeof Ship)[keyof typeof Ship];

export type Troop = Unit | Ship;

export interface Report {
    server: string;
    playerName: string;
    damage: number;
    kill?: boolean;
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
    | 'PREMIUM_ACCOUNT'
    | 'STEAM_HAMMER'
    | 'STEAM_CRYSTAL_DRILL'
    | 'STEAM_SAW'
    | 'STEAM_SULPHUR_PADDLE_WHEEL'
    | 'STEAM_WINE_PRESS'
    | 'STEAM_DRIVEN_FORKLIFT'
    | 'TOWN_RELOCATION'
    | 'TRITON_ENGINES'
    | 'TOWN_ICON';

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

export interface ResourceCost {
    wood?: number;
    wine?: number;
    marble?: number;
    crystal?: number;
    sulphur?: number;
}

export interface AbyssalAmbushEvent {
    name: string;
    startTime: Date;
    endTime: Date;
}
