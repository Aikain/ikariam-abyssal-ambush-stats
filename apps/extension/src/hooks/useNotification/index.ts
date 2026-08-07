import { useContext } from 'react';

import NotificationContext from './NotificationContext';

const useNotification = () => {
    const { showMessage } = useContext(NotificationContext);

    return { showMessage };
};

export default useNotification;
