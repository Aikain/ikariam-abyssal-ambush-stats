import { ReactNode, useState } from 'react';

import Notification from './Notification';
import NotificationContext from './NotificationContext';

interface Props {
    children: ReactNode;
}

export const NotificationProvider = ({ children }: Props) => {
    const [message, setMessage] = useState<string | null>(null);

    return (
        <NotificationContext.Provider value={{ message, showMessage: setMessage }}>
            {children}
            {message && <Notification message={message} onClose={() => setMessage(null)} />}
        </NotificationContext.Provider>
    );
};
