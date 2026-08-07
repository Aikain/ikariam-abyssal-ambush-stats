import type { Ship as ShipType, Unit as UnitType } from '@ikariam-abyssal-ambush-stats/types';

export const Unit = {
    HOPLITE: 'HOPLITE',
    STREAM_GIANT: 'STREAM_GIANT',
    SPEARMAN: 'SPEARMAN',
    SWORDSMAN: 'SWORDSMAN',
    SLINGER: 'SLINGER',
    ARCHER: 'ARCHER',
    SULPHYR_CARABINEER: 'SULPHYR_CARABINEER',
    BATTERING_RAM: 'BATTERING_RAM',
    CATAPULT: 'CATAPULT',
    MORTAR: 'MORTAR',
    GYROCOPTER: 'GYROCOPTER',
    BALLOON_BOMBARDIER: 'BALLOON_BOMBARDIER',
    COOK: 'COOK',
    DOCTOR: 'DOCTOR',
    SPARTAN: 'SPARTAN',
} as const;

export const Ship = {
    FIRE_SHIP: 'FIRE_SHIP',
    STEAM_RAM: 'STEAM_RAM',
    RAM_SHIP: 'RAM_SHIP',
    BALLISTA_SHIP: 'BALLISTA_SHIP',
    CATAPULT_SHIP: 'CATAPULT_SHIP',
    MORTAR_SHIP: 'MORTAR_SHIP',
    ROCKET_SHIP: 'ROCKET_SHIP',
    DIVING_BOAT: 'DIVING_BOAT',
    PADDLE_SPEEDBOAT: 'PADDLE_SPEEDBOAT',
    BALLOON_CARRIER: 'BALLOON_CARRIER',
    TENDER: 'TENDER',
} as const;

export const UnitSpritePosition: Record<UnitType, string> = {
    [Unit.SLINGER]: '0 -36px',
    [Unit.SWORDSMAN]: '-36px -36px',
    [Unit.HOPLITE]: '-72px -36px',
    [Unit.ARCHER]: '-108px -36px',
    [Unit.SULPHYR_CARABINEER]: '-144px -36px',
    [Unit.COOK]: '-180px -36px',
    [Unit.DOCTOR]: '-216px -36px',
    [Unit.STREAM_GIANT]: '-252px -36px',
    [Unit.GYROCOPTER]: '-288px -36px',
    [Unit.BALLOON_BOMBARDIER]: '-324px -36px',
    [Unit.CATAPULT]: '-360px -36px',
    [Unit.MORTAR]: '-396px -36px',
    [Unit.BATTERING_RAM]: '-432px -36px',
    [Unit.SPEARMAN]: '-540px -36px',
    [Unit.SPARTAN]: '-612px -36px',
};

export const ShipSpritePosition: Record<ShipType, string> = {
    [Ship.RAM_SHIP]: '-36px -36px',
    [Ship.BALLISTA_SHIP]: '-72px -36px',
    [Ship.FIRE_SHIP]: '-108px -36px',
    [Ship.CATAPULT_SHIP]: '-144px -36px',
    [Ship.STEAM_RAM]: '-180px -36px',
    [Ship.MORTAR_SHIP]: '-216px -36px',
    [Ship.DIVING_BOAT]: '-252px -36px',
    [Ship.TENDER]: '-288px -36px',
    [Ship.BALLOON_CARRIER]: '-324px -36px',
    [Ship.PADDLE_SPEEDBOAT]: '-360px -36px',
    [Ship.ROCKET_SHIP]: '-396px -36px',
};
