import * as styles from './styles.css';

type ViewToggleProps = {
  label: string;
  onClick: () => void;
  isSelected: boolean;
};

export const ViewToggle = ({ label, onClick, isSelected }: ViewToggleProps) => {
  return (
    <button className={styles.button} onClick={onClick} data-selected={isSelected}>
      <span>{label}</span>
    </button>
  );
};
