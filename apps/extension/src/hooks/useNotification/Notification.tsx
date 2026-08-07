import { useEffect, useState } from 'react';

import styles from './styles.module.css';

interface Props {
    message: string;
    onClose: () => void;
}

const Notification = ({ message, onClose }: Props) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsClosing(true), 3_000);
        return () => clearTimeout(timeout);
    }, [message]);

    const handleAnimationEnd = () => {
        if (!isClosing) return;
        onClose();
    };

    return (
        <div
            className={`${styles.toast} ${isClosing ? styles.closing : ''}`}
            onAnimationEnd={handleAnimationEnd}
            role='alert'
        >
            <div className={styles.icon}>
                <svg
                    viewBox='0 0 24 24'
                    width='18'
                    height='18'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                >
                    <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
            </div>
            <span className={styles.message}>{message}</span>
        </div>
    );
};

export default Notification;
