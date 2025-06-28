import * as styles from './styles.css';

export const passwordRules: string[] = [
  'Be at least 8 characters long',
  'Contain at least one uppercase letter',
  'Contain at least one lowercase letter',
  'Contain at least one number',
  'Contain at least one special character (@$!%*?&)',
];

export const PasswordHint = () => {
  return (
    <span className={styles.tooltipWrapper}>
      <button type="button" className={styles.tooltipIcon} aria-label="Password Rules">
        ?
      </button>
      <div className={styles.tooltipBox}>
        <p className={styles.tooltipTitle}>Password Must:</p>
        <ul className={styles.tooltipList}>
          {passwordRules.map((rule, i) => (
            <li key={i}>{rule}</li>
          ))}
        </ul>
      </div>
    </span>
  );
};
