import { Report, Reward } from '@ikariam-abyssal-ambush-stats/types';

import { parseAbyssalAmbushReport, parseCityNews } from './parseData';
import setupListeners from './setupListener';

const REPORT_VIEW_ID = 'militaryAdvisorAbyssalAmbushReportView';
const TRADE_VIEW_ID = 'tradeAdvisor';
const TRADE_ADVISOR_TAB_ID = 'tab_tradeAdvisor';

const TRADE_ADVISOR_CONTENT_SELECTOR = '#tradeAdvisor .mainContent';

const handleReportView = () => {
    const report = parseAbyssalAmbushReport();
    if (!report) return;

    chrome.storage.local.get(['abyssalAmbushReports'], (result: { abyssalAmbushReports?: Report[] }) => {
        const reports = result.abyssalAmbushReports ?? [];

        if (
            !report.date ||
            reports.some(
                ({ date, playerName, server }) =>
                    date === report.date && playerName === report.playerName && server === report.server,
            )
        )
            return;

        chrome.storage.local.set({ abyssalAmbushReports: [...reports, report] });
    });
};

const handleCityNews = () => {
    const rewards = parseCityNews();
    if (rewards.length === 0) return;

    chrome.storage.local.get(['abyssalAmbushRewards'], (result: { abyssalAmbushRewards?: Reward[] }) => {
        const oldRewards = result.abyssalAmbushRewards ?? [];

        const newRewards = rewards.filter(
            (newReward) =>
                oldRewards.find(
                    (oldReward) =>
                        newReward.count === oldReward.count &&
                        newReward.date === oldReward.date &&
                        newReward.playerName === oldReward.playerName &&
                        newReward.resource === oldReward.resource &&
                        newReward.server === oldReward.server &&
                        newReward.size === oldReward.size,
                ) === undefined,
        );

        if (newRewards.length === 0) return;

        chrome.storage.local.set({ abyssalAmbushRewards: [...oldRewards, ...newRewards] });
    });
};

(() => {
    setupListeners({
        [REPORT_VIEW_ID]: handleReportView,

        [TRADE_VIEW_ID]: () => {
            setupListeners(
                {
                    [TRADE_ADVISOR_TAB_ID]: handleCityNews,
                },
                TRADE_ADVISOR_CONTENT_SELECTOR,
            );
            handleCityNews();
        },
    });
})();
