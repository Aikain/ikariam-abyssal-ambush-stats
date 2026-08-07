import { createContext } from 'react';

const NotificationContext = createContext<{
    message: string | null;
    showMessage: (message: string) => void;
}>({
    message: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    showMessage: () => {},
});

export default NotificationContext;
