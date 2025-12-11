import { useEffect, useState } from 'react';

import { Report } from '@ikariam-abyssal-ambush-stats/types';

const App = () => {
    const [reports, setReports] = useState<Report[]>([]);

    const downloadData = () => {
        const url = URL.createObjectURL(new Blob([JSON.stringify(reports)], { type: 'application/json' }));

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
        chrome.storage.local.get(['abyssalAmbushReports'], (result: { abyssalAmbushReports?: Report[] }) => {
            setReports(result.abyssalAmbushReports ?? []);
        });
    }, []);

    const groupedReports = Object.values(Object.groupBy(reports, ({ server, playerId }) => `${server}_${playerId}`))
        .filter((reports) => !!reports)
        .filter((reports) => reports.length > 0)
        .map((reports) => ({
            title: `${reports[0].server}, ${reports[0].playerId}`,
            reports: reports.sort((a, b) => b.date.localeCompare(a.date)),
        }));

    return (
        <>
            <header>
                <h1>Ikariam Abyssal Ambush</h1>
            </header>
            <main>
                <ul className='list'>
                    {groupedReports.map(({ reports, title }) => (
                        <>
                            <li className='item header'>{title}</li>
                            {reports.map(({ damage, date }) => (
                                <li key={date} className='item'>
                                    <span className='date'>{new Date(date).toLocaleString()}</span>
                                    <span className='damage'>(Dmg: {damage})</span>
                                </li>
                            ))}
                        </>
                    ))}
                </ul>
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
