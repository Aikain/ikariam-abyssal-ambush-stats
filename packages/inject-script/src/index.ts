import parseData from './parseData';
import setupListener from './setupListener';

const ADD_REPORT_KEY = 'IKARIAM_ABYSSAL_AMBUSH__ADD_REPORT';
const REPORT_VIEW_ID = 'militaryAdvisorAbyssalAmbushReportView';

(() => {
    setupListener(REPORT_VIEW_ID, () => {
        const data = parseData();
        if (data) window.postMessage({ type: ADD_REPORT_KEY, payload: data }, '*');
    });
})();
