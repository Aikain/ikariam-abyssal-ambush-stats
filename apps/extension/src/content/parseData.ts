import { Report, Reward, Troop } from '@ikariam-abyssal-ambush-stats/types';

import { convertDateToISOString, parseReward } from './utils';

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

export const parseAbyssalAmbushReport = (): Report | null => {
    const combatInfo = document.querySelector('.combatInfo');
    const headerDate = document.querySelector('.header .date');

    if (combatInfo === null || headerDate === null) return null;

    const damageText = combatInfo.textContent.match(/tekemään (\d+) vahinkoa/)?.[1];
    const dateText = headerDate.textContent.replace('(', '').replace(')', '');

    if (!damageText || !dateText) return null;

    const damage = parseInt(damageText);
    const date = new Date(dateText.replace(/(\d{2}).(\d{2}).(\d{4}) (\d+).(\d{2}).(\d{2})/, '$3-$2-$1 $4:$5:$6'));

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
        playerName: document.querySelector('.avatarName')?.textContent.trim() ?? '-',
        damage,
        date: convertDateToISOString(date),
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

export const parseCityNews = (): Reward[] =>
    Array.from(document.querySelectorAll('#inboxCity tr:has(.city .category.transport)'))
        .filter(
            (obj) =>
                obj.querySelector('.subject')?.textContent.indexOf('palkinnoksi osallistumisestasi tapahtumaan') !== -1,
        )
        .map((obj) => {
            const dateText = obj.querySelector('.date')?.textContent.trim();
            const subjectText = obj.querySelector('.subject')?.textContent.trim();

            if (!dateText || !subjectText) return null;

            const date = new Date(dateText.replace(/(\d{2}).(\d{2}).(\d{4}) (\d+).(\d{2})/, '$3-$2-$1 $4:$5'));
            return {
                ...parseReward(subjectText),
                date: convertDateToISOString(date),
                playerName: document.querySelector('.avatarName')?.textContent.trim() ?? '-',
                server: location.hostname.replace('.ikariam.gameforge.com', ''),
            };
        })
        .filter((news) => news !== null);
