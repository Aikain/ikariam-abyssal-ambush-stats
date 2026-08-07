import { useContext } from 'react';
import { flushSync } from 'react-dom';

import { toBlob } from 'html-to-image';

import useNotification from '@/hooks/useNotification';

import EventScreenshotContext from './EventScreenshotContext';
import { Content } from './types';

const useEventScreenshot = () => {
    const { content, ref, setContent } = useContext(EventScreenshotContext);
    const { showMessage } = useNotification();

    const copySummaryImage = async (content: Content) => {
        flushSync(() => {
            setContent(content);
        });

        await new Promise((resolve) => requestAnimationFrame(resolve));

        if (!ref?.current) return;

        try {
            const blob = await toBlob(ref.current);
            if (blob) {
                await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
                showMessage('Kuva kopioitu leikepöydäylle');
            }
        } finally {
            setContent(null);
        }
    };

    return { copySummaryImage, loading: content !== null };
};

export default useEventScreenshot;
