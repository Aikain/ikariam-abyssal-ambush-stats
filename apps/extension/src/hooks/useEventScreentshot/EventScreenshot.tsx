import {
    ResourceBackgroundUrl,
    Ship,
    ShipSpritePosition,
    TROOP_COST,
    TROOP_COST_MULTIPLIER,
    Unit,
    UnitSpritePosition,
} from '@ikariam-abyssal-ambush-stats/data';
import type { ResourceCost, Ship as ShipType, Troop, Unit as UnitType } from '@ikariam-abyssal-ambush-stats/types';

import styles from './styles.module.css';
import { Content } from './types';

const dateRangeFormatter = new Intl.DateTimeFormat();
const numberFormatter = Intl.NumberFormat(undefined, {});
const percentFormatter = Intl.NumberFormat(undefined, { style: 'percent', maximumFractionDigits: 0 });

const EventScreenshot = ({ event, playerName, reports, rewards, server }: Content) => {
    const totalDamage = reports.reduce((total, { damage, kill }) => total + damage * (kill ? 1.25 : 1), 0);

    const totalTroops = reports.reduce(
        (total, { troops }) => {
            (Object.entries(troops) as [Troop, { lost: number }][]).forEach(([troop, { lost }]) => {
                if (!total[troop]) total[troop] = 0;
                total[troop] -= lost;
            });
            return total;
        },
        {} as Record<Troop, number>,
    );

    const totalCosts = reports.reduce(
        (total, { troops }) => {
            (Object.entries(troops) as [Troop, { lost: number }][]).forEach(([troop, { lost }]) => {
                const cost = TROOP_COST[troop];
                const multiplier =
                    Object.keys(Unit).indexOf(troop) !== -1
                        ? (TROOP_COST_MULTIPLIER[server]?.unit ?? 1)
                        : (TROOP_COST_MULTIPLIER[server]?.ship ?? 1);

                // TODO: remove hardcoded reducers
                total.wood += (cost.wood ?? 0) * -lost * 0.5 * multiplier;
                total.wine += (cost.wine ?? 0) * -lost * 0.5 * multiplier;
                total.marble += (cost.marble ?? 0) * -lost * 0.5 * multiplier;
                total.crystal += (cost.crystal ?? 0) * -lost * 0.5 * multiplier;
                total.sulphur += (cost.sulphur ?? 0) * -lost * 0.5 * multiplier;
                total.citizen += (cost.citizen ?? 0) * -lost * multiplier;
            });
            return total;
        },
        {
            wood: 0,
            wine: 0,
            marble: 0,
            crystal: 0,
            sulphur: 0,
            citizen: 0,
        } as Required<ResourceCost & { citizen: number }>,
    );

    const totalRewards = rewards.reduce(
        (total, { count, resource, size }) => {
            switch (resource) {
                case 'BUILDING_MATERIAL':
                    total.wood += count * size;
                    break;
                case 'WINE':
                    total.wine += count * size;
                    break;
                case 'MARBLE':
                    total.marble += count * size;
                    break;
                case 'CRYSTAL_GLASS':
                    total.crystal += count * size;
                    break;
                case 'SULPHUR':
                    total.sulphur += count * size;
                    break;
            }
            return total;
        },
        {
            wood: 0,
            wine: 0,
            marble: 0,
            crystal: 0,
            sulphur: 0,
        } as Required<ResourceCost>,
    );

    const totalCostsSum = Object.entries(totalCosts)
        .filter(([key]) => key !== 'citizen')
        .map(([, cost]) => cost)
        .reduce((total, cur) => total + cur, 0);
    const totalRewardsSum = Object.values(totalRewards).reduce((total, cur) => total + cur, 0);

    const valueToCostRatio = totalRewardsSum / totalCostsSum;

    const profit = totalRewardsSum - totalCostsSum;
    const kills = reports.reduce((total, { kill }) => total + (kill ? 1 : 0), 0);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{event.name}</h1>

            <span className={styles.time}>
                {dateRangeFormatter.formatRange(event.startTime, event.endTime)} / {server} - {playerName}
            </span>

            <div className={styles.performance}>
                <div className={styles.totalDamage}>
                    <span className={styles.text}>Kokonaisvahinko</span>
                    <span className={styles.value}>{numberFormatter.format(totalDamage)}</span>
                </div>
                <div className={styles.valueToCostRatio}>
                    <span className={styles.text}>Hyötysuhde</span>
                    <span className={styles.value}>
                        {totalRewardsSum > 0 ? percentFormatter.format(valueToCostRatio) : '-'}
                    </span>
                </div>
            </div>

            <div className={styles.troops}>
                <div className={styles.units}>
                    {(Object.keys(Unit) as UnitType[])
                        .map((troop) => ({ troop, total: totalTroops[troop] ?? 0 }))
                        .filter(({ total }) => total > 0)
                        .map(({ troop, total }) => (
                            <div key={troop} className={styles.troopRow}>
                                <div
                                    className={styles.troopSprite}
                                    style={{
                                        backgroundImage: `url(https://s301-en.ikariam.gameforge.com/cdn/all/both/characters/military/unitsprites_x34_y35_enhanced.png)`,
                                        backgroundPosition: UnitSpritePosition[troop],
                                    }}
                                />
                                <span>{numberFormatter.format(total)}</span>
                            </div>
                        ))}
                </div>
                <div className={styles.ships}>
                    {(Object.keys(Ship) as ShipType[])
                        .map((troop) => ({ troop, total: totalTroops[troop] ?? 0 }))
                        .filter(({ total }) => total > 0)
                        .map(({ troop, total }) => (
                            <div key={troop} className={styles.troopRow}>
                                <div
                                    className={styles.troopSprite}
                                    style={{
                                        backgroundImage: `url(https://s301-en.ikariam.gameforge.com/cdn/all/both/premium/unitfleets_x34_y34.png)`,
                                        backgroundPosition: ShipSpritePosition[troop],
                                    }}
                                />
                                <span>{numberFormatter.format(total)}</span>
                            </div>
                        ))}
                </div>
            </div>
            <div className={styles.rewards}>
                <div className={styles.resourceCard}>
                    <span className={styles.subTitle}>Käytetyt resurssit</span>
                    {(Object.entries(totalCosts) as [keyof ResourceCost | 'citizen', number][])
                        .filter(([, cost]) => cost > 0)
                        .map(([resource, cost]) => (
                            <div key={resource} className={styles.resource}>
                                <div
                                    className={styles.resourceImage}
                                    style={{
                                        backgroundImage: `url(https://s301-en.ikariam.gameforge.com/cdn/all/both/resources/${ResourceBackgroundUrl[resource]})`,
                                    }}
                                />
                                <span>{numberFormatter.format(cost)}</span>
                            </div>
                        ))}
                </div>
                <div className={styles.resourceCard}>
                    <span className={styles.subTitle}>Saadut resurssit</span>
                    {rewards.length > 0 ? (
                        (Object.entries(totalRewards) as [keyof ResourceCost, number][])
                            .filter(([, cost]) => cost > 0)
                            .map(([resource, cost]) => (
                                <div key={resource} className={styles.resource}>
                                    <div
                                        className={styles.resourceImage}
                                        style={{
                                            backgroundImage: `url(https://s301-en.ikariam.gameforge.com/cdn/all/both/resources/${ResourceBackgroundUrl[resource]})`,
                                        }}
                                    />
                                    <span>{numberFormatter.format(cost)}</span>
                                </div>
                            ))
                    ) : (
                        <span className={styles.emptyRewards}>Palkintoja ei vielä jaettu</span>
                    )}
                </div>
            </div>

            <div className={styles.performance}>
                <div className={styles.totalProfit}>
                    <span className={styles.text}>Kokonaistuotto</span>
                    <span className={styles.value}>{numberFormatter.format(profit)}</span>
                </div>
                <div className={styles.totalKills}>
                    <span className={styles.text}>Viimeiset osumat</span>
                    {kills > 0 ? (
                        <span className={styles.value}>{kills}</span>
                    ) : (
                        <span className={styles.zeroKills}>Ei yhtään viimeistä osumaa</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventScreenshot;
