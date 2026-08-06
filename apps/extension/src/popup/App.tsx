import { useEffect, useState } from 'react';

import { ABYSSAL_AMBUSH_EVENTS } from '@ikariam-abyssal-ambush-stats/data';
import { Report, Reward } from '@ikariam-abyssal-ambush-stats/types';

import Event from './event';

const MILLI_SECONDS_IN_DAY = 24 * 60 * 60 * 1000;

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

    const events = ABYSSAL_AMBUSH_EVENTS.map((event) => ({
        ...event,
        reports: reports.filter(({ date }) => event.startTime <= new Date(date) && new Date(date) <= event.endTime),
        rewards: rewards.filter(
            ({ date }) =>
                event.endTime <= new Date(date) &&
                new Date(date).getTime() <= event.endTime.getTime() + 7 * MILLI_SECONDS_IN_DAY,
        ),
    }))
        .filter(({ reports, rewards }) => reports.length > 0 || rewards.length > 0)
        .sort((a, b) => (a.startTime < b.startTime ? 1 : -1));

    return (
        <>
            <header>
                <h1>Ikariam Abyssal Ambush</h1>
            </header>
            <main>
                {events.map(({ reports, rewards, ...event }, index) => (
                    <Event key={index} event={event} reports={reports} rewards={rewards} />
                ))}
            </main>
            <footer>
                {/* TODO: move to settings */}
                <button className='download-btn' onClick={downloadData}>
                    Download JSON file
                </button>
            </footer>
        </>
    );
};

export default App;
