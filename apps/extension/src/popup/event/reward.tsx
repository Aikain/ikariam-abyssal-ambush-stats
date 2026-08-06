import { Reward, RewardType } from '@ikariam-abyssal-ambush-stats/types';

import { translateResource } from '../utils';
import styles from './styles.module.css';

interface Props {
    rewards: Reward[];
}

const amountFormatter = Intl.NumberFormat(undefined, {});

const RewardList = ({ rewards }: Props) => {
    const resourceOrder: RewardType[] = ['BUILDING_MATERIAL', 'WINE', 'MARBLE', 'CRYSTAL_GLASS', 'SULPHUR', 'GOLD'];

    const finalRewards = (
        Object.entries(
            rewards.reduce(
                (total, { count, resource, size }) => {
                    if (!total[resource]) total[resource] = 0;
                    total[resource] += count * size;
                    return total;
                },
                {} as Record<RewardType, number>,
            ),
        ) as [[RewardType, number]]
    )
        .map(([resource, amount]) => ({ amount, resource }))
        .sort((a, b) => resourceOrder.indexOf(a.resource) - resourceOrder.indexOf(b.resource));

    const resourceTotal = rewards
        .filter(
            ({ resource }) =>
                ['BUILDING_MATERIAL', 'WINE', 'MARBLE', 'CRYSTAL_GLASS', 'SULPHUR'].indexOf(resource) !== -1,
        )
        .reduce((total, cur) => total + cur.count * cur.size, 0);

    return (
        <div className={styles.container}>
            <h2>Palkinnot</h2>
            {finalRewards.length > 0 ? (
                <ul>
                    {finalRewards.map(({ amount, resource }) => (
                        <li key={resource} className={styles.item}>
                            {amountFormatter.format(amount)} {translateResource(resource)}
                        </li>
                    ))}
                    <li className={styles.item}>Yhteensä: {amountFormatter.format(resourceTotal)} resurssia</li>
                </ul>
            ) : (
                <span>Yhtään palkintoa ei ole vielä kirjattu.</span>
            )}
        </div>
    );
};

export default RewardList;
