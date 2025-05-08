/** @jsxImportSource @emotion/react */
import * as styles from './styles.ts';

type ViewToggleProps = {
  label: string;
  onClick: () => void;
  isSelected: boolean;
};

export const ViewToggle = ({ label, onClick, isSelected }: ViewToggleProps) => {
  return (
    <styles.Button onClick={onClick} data-selected={isSelected}>
      <span>{label}</span>
    </styles.Button>
  );
};
