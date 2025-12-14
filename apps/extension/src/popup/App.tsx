import { Fragment, useEffect, useState } from 'react';

import { Report, Reward, RewardType } from '@ikariam-abyssal-ambush-stats/types';

import { translateResource } from './utils';

const App = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [rewards, setRewards] = useState<Reward[]>([]);

    const downloadData = () => {
        const url = URL.createObjectURL(new Blob([JSON.stringify({ reports, rewards })], { type: 'application/json' }));

        const element = document.createElement('a');
        element.setAttribute('href', url);
        element.setAttribute(
            'download',
            `ikariam-abyssal-ambush-data-${new Date().toLocaleString('sv', { year: 'numeric', month: '2-digit', day: '2-digit' })}.json`,
        );
        element.style.display = 'none';

        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    useEffect(() => {
        chrome.storage.local.get(
            ['abyssalAmbushReports', 'abyssalAmbushRewards'],
            ({
                abyssalAmbushReports,
                abyssalAmbushRewards,
            }: {
                abyssalAmbushReports?: Report[];
                abyssalAmbushRewards?: Reward[];
            }) => {
                setReports(abyssalAmbushReports ?? []);
                setRewards(abyssalAmbushRewards ?? []);
            },
        );
    }, []);

    const groupedReports = Object.values(Object.groupBy(reports, ({ server, playerName }) => `${server}_${playerName}`))
        .filter((reports) => !!reports)
        .filter((reports) => reports.length > 0)
        .map((reports) => ({
            title: `${reports[0].server}, ${reports[0].playerName}`,
            reports: reports.sort((a, b) => b.date.localeCompare(a.date)),
        }));

    const resourceOrder: RewardType[] = ['BUILDING_MATERIAL', 'WINE', 'MARBLE', 'CRYSTAL_GLASS', 'SULPHUR', 'GOLD'];

    const groupedRewards = Object.values(Object.groupBy(rewards, ({ server, playerName }) => `${server}_${playerName}`))
        .filter((rewards) => !!rewards)
        .filter((reward) => reward.length > 0)
        .map((rewards) => ({
            title: `${rewards[0].server}, ${rewards[0].playerName}`,
            rewards: (
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
                .sort((a, b) => resourceOrder.indexOf(a.resource) - resourceOrder.indexOf(b.resource)),
        }));

    const amountFormatter = Intl.NumberFormat(undefined, {});

    return (
        <>
            <header>
                <h1>Ikariam Abyssal Ambush</h1>
            </header>
            <main>
                <div className='container'>
                    <h2>Taistelut</h2>
                    {groupedReports.length > 0 ? (
                        <ul className='list'>
                            {groupedReports.map(({ reports, title }, index) => (
                                <Fragment key={index}>
                                    <li key={title} className='item header'>
                                        {title}
                                    </li>
                                    {reports.map(({ damage, date }) => (
                                        <li key={date} className='item'>
                                            <span className='date'>{new Date(date).toLocaleString()}</span>
                                            <span className='damage'>(Dmg: {damage})</span>
                                        </li>
                                    ))}
                                </Fragment>
                            ))}
                        </ul>
                    ) : (
                        <span>Yhtään taisteluraporttia ei ole vielä kerätty.</span>
                    )}
                </div>

                <div className='container'>
                    <h2>Palkinnot</h2>
                    {groupedRewards.length > 0 ? (
                        <ul className='list'>
                            {groupedRewards.map(({ rewards, title }, index) => (
                                <Fragment key={index}>
                                    <li key={title} className='item header'>
                                        {title}
                                    </li>
                                    {rewards.map(({ amount, resource }) => (
                                        <li key={resource} className='item'>
                                            <span className='damage'>
                                                {amountFormatter.format(amount)} {translateResource(resource)}
                                            </span>
                                        </li>
                                    ))}
                                </Fragment>
                            ))}
                        </ul>
                    ) : (
                        <span>Yhtään palkintoa ei ole vielä kirjattu.</span>
                    )}
                </div>
            </main>
            <footer>
                <button className='download-btn' onClick={downloadData}>
                    Download JSON file
                </button>
            </footer>
        </>
    );
};

export default App;
