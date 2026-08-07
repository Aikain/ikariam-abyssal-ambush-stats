import { ReactNode, useRef, useState } from 'react';

import EventScreenshot from './EventScreenshot';
import EventScreenshotContext from './EventScreenshotContext';
import { Content } from './types';

interface Props {
    children: ReactNode;
}

export const EventScreenshotProvider = ({ children }: Props) => {
    const [content, setContent] = useState<Content | null>(null);
    const screenshotRef = useRef<HTMLDivElement>(null);

    return (
        <EventScreenshotContext.Provider value={{ content, ref: screenshotRef, setContent }}>
            {children}
            {content && (
                <div ref={screenshotRef}>
                    <EventScreenshot {...content} />
                </div>
            )}
        </EventScreenshotContext.Provider>
    );
};
