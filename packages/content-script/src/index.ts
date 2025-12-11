import { Report } from '@ikariam-abyssal-ambush-stats/types';

const ADD_REPORT_KEY = 'IKARIAM_ABYSSAL_AMBUSH__ADD_REPORT';

const script = document.createElement('script');
script.src = chrome.runtime.getURL('inject.js');
(document.head || document.documentElement).appendChild(script);

window.addEventListener('message', function (event) {
    if (event.source !== window || event.data.type !== ADD_REPORT_KEY) return;

    const report: Report = event.data.payload;

    chrome.storage.local.get(['abyssalAmbushReports'], (result: { abyssalAmbushReports?: Report[] }) => {
        const reports = result.abyssalAmbushReports ?? [];

        if (
            !report.date ||
            reports.some(
                ({ date, playerId, server }) =>
                    date === report.date && playerId === report.playerId && server === report.server,
            )
        )
            return;

        chrome.storage.local.set({ abyssalAmbushReports: [...reports, report] });
    });
});
