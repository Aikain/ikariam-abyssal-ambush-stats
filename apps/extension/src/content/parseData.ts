import { Ship, Unit } from '@ikariam-abyssal-ambush-stats/data';
import { Report, Reward, Troop } from '@ikariam-abyssal-ambush-stats/types';

import { convertDateToISOString, parseReward } from './utils';

const translatedTroops: Record<string, Troop | undefined> = {
    // Units
    Hopliitti: Unit.HOPLITE,
    Höyryjätti: Unit.STREAM_GIANT,
    Keihäsmies: Unit.SPEARMAN,
    Miekkamies: Unit.SWORDSMAN,
    Linkomies: Unit.SLINGER,
    Jousiampuja: Unit.ARCHER,
    Kiväärimies: Unit.SULPHYR_CARABINEER,
    Murtaja: Unit.BATTERING_RAM,
    Katapultti: Unit.CATAPULT,
    Heitin: Unit.MORTAR,
    Gyrokopteri: Unit.GYROCOPTER,
    Ilmapommikone: Unit.BALLOON_BOMBARDIER,
    Kokki: Unit.COOK,
    Lääkäri: Unit.DOCTOR,

    // Ships
    Liekinheitinalus: Ship.FIRE_SHIP,
    Höyrymurtaja: Ship.STEAM_RAM,
    Murtajalaiva: Ship.RAM_SHIP,
    Tykkilaiva: Ship.BALLISTA_SHIP,
    Katapulttilaiva: Ship.CATAPULT_SHIP,
    Heitinalus: Ship.MORTAR_SHIP,
    Rakettilaiva: Ship.ROCKET_SHIP,
    Sukellusvene: Ship.DIVING_BOAT,
    Taistelupikavene: Ship.PADDLE_SPEEDBOAT,
    Ilmapommitukialus: Ship.BALLOON_CARRIER,
    Huoltoalus: Ship.TENDER,
};

export const parseAbyssalAmbushReport = (): Report | null => {
    const combatInfo = document.querySelector('.combatInfo');
    const headerDate = document.querySelector('.header .date');

    if (combatInfo === null || headerDate === null) return null;

    const damageText = combatInfo.textContent.match(/tekemään (\d+) vahinkoa/)?.[1];
    const dateText = headerDate.textContent.replace('(', '').replace(')', '');
    const hpText = combatInfo.textContent.match(/arvoon (\d+)./)?.[1];

    if (!damageText || !dateText || !hpText) return null;

    const damage = parseInt(damageText);
    const date = new Date(dateText.replace(/(\d{2}).(\d{2}).(\d{4}) (\d+).(\d{2}).(\d{2})/, '$3-$2-$1 $4:$5:$6'));
    const hp = parseInt(hpText);

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
        kill: hp === 0,
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
                obj
                    .querySelector('.subject')
                    ?.textContent.match(/(Vastaanotat|Saat) (.*) palkinnoksi osallistumisestasi tapahtumaan/) !== null,
        )
        .map((obj) => {
            const dateText = obj.querySelector('.date')?.textContent.trim();
            const subjectText = obj.querySelector('.subject');

            if (!dateText || !subjectText) return null;

            const date = new Date(dateText.replace(/(\d{2}).(\d{2}).(\d{4}) (\d+).(\d{2})/, '$3-$2-$1 $4:$5'));
            return {
                ...parseReward(subjectText.textContent.trim(), subjectText.querySelector('img')?.title.trim()),
                date: convertDateToISOString(date),
                playerName: document.querySelector('.avatarName')?.textContent.trim() ?? '-',
                server: location.hostname.replace('.ikariam.gameforge.com', ''),
            };
        })
        .filter((news) => news !== null);
