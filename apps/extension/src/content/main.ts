import { Report } from '@ikariam-abyssal-ambush-stats/types';

import parseData from './parseData';
import setupListener from './setupListener';

const REPORT_VIEW_ID = 'militaryAdvisorAbyssalAmbushReportView';

(() => {
    setupListener(REPORT_VIEW_ID, () => {
        const report = parseData();
        if (!report) return;

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
})();
