import { RefObject, createContext } from 'react';

import { Content } from './types';

const EventScreenshotContext = createContext<{
    content: Content | null;
    ref: RefObject<HTMLDivElement | null> | null;
    setContent: (_: Content | null) => void;
}>({
    content: null,
    ref: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setContent: () => {},
});

export default EventScreenshotContext;
