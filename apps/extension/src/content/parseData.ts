import { Report, Troop } from '@ikariam-abyssal-ambush-stats/types';

declare global {
    interface Window {
        dataSetForView?: { avatarId?: string };
    }
}

const translatedTroops: Record<string, Troop | undefined> = {
    // Units
    Hopliitti: 'HOPLITE',
    Höyryjätti: 'STREAM_GIANT',
    Keihäsmies: 'SPEARMAN',
    Miekkamies: 'SWORDSMAN',
    Linkomies: 'SLINGER',
    Jousiampuja: 'ARCHER',
    Kiväärimies: 'SULPHYR_CARABINEER',
    Murtaja: 'BATTERING_RAM',
    Katapultti: 'CATAPULT',
    Heitin: 'MORTAR',
    Gyrokopteri: 'GYROCOPTER',
    Ilmapommikone: 'BALLOON_BOMBARDIER',
    Kokki: 'COOK',
    Lääkäri: 'DOCTOR',

    // Ships
    Liekinheitinalus: 'FIRE_SHIP',
    Höyrymurtaja: 'STEAM_RAM',
    Murtajalaiva: 'RAM_SHIP',
    Tykkilaiva: 'BALLISTA_SHIP',
    Katapulttilaiva: 'CATAPULT_SHIP',
    Heitinalus: 'MORTAR_SHIP',
    Rakettilaiva: 'ROCKET_SHIP',
    Sukellusvene: 'DIVING_BOAT',
    Taistelupikavene: 'PADDLE_SPEEDBOAT',
    Ilmapommitukialus: 'BALLOON_CARRIER',
    Huoltoalus: 'TENDER',
};

const parseData = (): Report | null => {
    const combatInfo = document.querySelector('.combatInfo');
    const headerDate = document.querySelector('.header .date');

    if (combatInfo === null || headerDate === null) return null;

    const damageText = combatInfo.textContent.match(/tekemään (\d+) vahinkoa/)?.[1];
    const dateText = headerDate.textContent.replace('(', '').replace(')', '');

    if (!damageText || !dateText) return null;

    const damage = parseInt(damageText);
    const date = new Date(dateText.replace(/(\d{2}).(\d{2}).(\d{4}) (\d+).(\d{2}).(\d{2})/, '$3-$2-$1 $4:$5:$6'));
    date.setHours(
        date.getHours() +
            Math.round(
                (Date.now() - Date.parse(new Date().toLocaleString('sv', { timeZone: 'Europe/Berlin' }))) / 3600000,
            ),
    );

    const units = Array.from(document.querySelectorAll('.militaryList tr:not(.textblue):not(.line) td')).map((obj) =>
        obj.textContent.trim(),
    );

    const counts = Array.from(document.querySelectorAll('.militaryList tr.textblue td')).map((obj) =>
        parseInt(obj.textContent.trim().replace('(', '').replace(')', ''), 10),
    );

    const strengths = Array.from(document.querySelectorAll('.strengthGraph .strengthBox'))
        .map((obj) => obj.textContent.trim().split('\n'))
        .reduce(
            (data, [name, percent]) => {
                data[name.trim()] = parseInt(percent.trim().replace('%', '')) / 100;
                return data;
            },
            {} as Record<string, number>,
        );

    const data: Report = {
        server: location.hostname.replace('.ikariam.gameforge.com', ''),
        playerId: parseInt(window.dataSetForView?.avatarId ?? '0'),
        damage,
        date: date.toISOString(),
        troops: {},
    };

    for (let i = 0; i < units.length; i++) {
        const troop = translatedTroops[units[i]];
        if (!troop) continue;
        data.troops[troop] = {
            left: counts[i * 2],
            lost: counts[i * 2 + 1],
            strength: strengths[units[i]],
        };
    }

    return data;
};

export default parseData;
