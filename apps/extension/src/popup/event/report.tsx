import { Report } from '@ikariam-abyssal-ambush-stats/types';

import styles from './styles.module.css';

interface Props {
    reports: Report[];
}

const damageFormatter = Intl.NumberFormat(undefined, {});

const ReportList = ({ reports }: Props) => {
    const finalReports = reports.sort((a, b) => b.date.localeCompare(a.date));

    return (
        <div className={styles.container}>
            <h2>Taistelut</h2>
            {finalReports.length > 0 ? (
                <ul className={styles.list}>
                    {finalReports.map(({ damage, date }) => (
                        <li key={date} className={styles.item}>
                            <span className={styles.itemDate}>{new Date(date).toLocaleString()}</span>
                            <span className={styles.itemDamage}>(Dmg: {damageFormatter.format(damage)})</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <span>Yhtään taisteluraporttia ei ole vielä kerätty.</span>
            )}
        </div>
    );
};

export default ReportList;
