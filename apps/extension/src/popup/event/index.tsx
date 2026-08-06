import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';

import { AbyssalAmbushEvent, Report, Reward } from '@ikariam-abyssal-ambush-stats/types';

import ArrowDownIcon from '@/icons/keyboard_arrow_down.svg';

import ReportList from './report';
import RewardList from './reward';
import styles from './styles.module.css';

interface Props {
    event: AbyssalAmbushEvent;
    reports: Report[];
    rewards: Reward[];
}

const damageFormatter = Intl.NumberFormat(undefined, {});
const dateRangeFormatter = new Intl.DateTimeFormat();

const Event = ({ event: { endTime, name, startTime }, reports, rewards }: Props) => {
    const groupedReports = Object.values(Object.groupBy(reports, ({ server, playerName }) => `${server}_${playerName}`))
        .filter((reports) => !!reports)
        .filter((reports) => reports.length > 0)
        .reduce(
            (total, cur) => {
                if (cur.length > 0) total[`${cur[0].server}_${cur[0].playerName}`] = cur;
                return total;
            },
            {} as Record<string, Report[]>,
        );

    const groupedRewards = Object.values(Object.groupBy(rewards, ({ playerName, server }) => `${server}_${playerName}`))
        .filter((rewards) => !!rewards)
        .filter((reward) => reward.length > 0)
        .reduce(
            (total, cur) => {
                if (cur.length > 0) total[`${cur[0].server}_${cur[0].playerName}`] = cur;
                return total;
            },
            {} as Record<string, Reward[]>,
        );

    const accounts = [...new Set([...Object.keys(groupedReports), ...Object.keys(groupedRewards)])]
        .sort((a, b) => {
            const [aNumber, aLanguage, aPlayerName] = a.split(/[-_]/);
            const [bNumber, bLanguage, bPlayerName] = b.split(/[-_]/);
            return aLanguage != bLanguage
                ? aLanguage.localeCompare(bLanguage)
                : aNumber != bNumber
                  ? aNumber.localeCompare(bNumber)
                  : aPlayerName.localeCompare(bPlayerName);
        })
        .map((key) => ({
            key,
            server: key.split('_').at(0),
            playerName: key.split('_').at(1),
            damage: groupedReports[key].reduce((total, cur) => total + cur.damage, 0),
        }));

    return (
        <Disclosure as='div' className={styles.disclosure}>
            <DisclosureButton className={styles.disclosureButton}>
                <div className={styles.details}>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.time}>{dateRangeFormatter.formatRange(startTime, endTime)}</span>
                </div>
                <ArrowDownIcon />
            </DisclosureButton>
            <DisclosurePanel className={styles.disclosurePanel}>
                {accounts.map(({ damage, key, playerName, server }) => (
                    <Disclosure key={key}>
                        <DisclosureButton className={styles.innerDisclosureButton}>
                            {server} - {playerName} ({damageFormatter.format(damage)} dmg)
                            <ArrowDownIcon />
                        </DisclosureButton>
                        <DisclosurePanel className={styles.innerDisclosurePanel}>
                            <ReportList reports={groupedReports[key] ?? []} />
                            <RewardList rewards={groupedRewards[key] ?? []} />
                        </DisclosurePanel>
                    </Disclosure>
                ))}
            </DisclosurePanel>
        </Disclosure>
    );
};

export default Event;
