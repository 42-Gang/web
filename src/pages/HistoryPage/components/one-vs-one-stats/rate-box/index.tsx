import * as styles from './styles.css';

type RateBoxProps = {
  label: string;
  value: number;
};

export const RateBox = ({ label, value }: RateBoxProps) => {
  return (
    <div className={styles.container}>
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
};
