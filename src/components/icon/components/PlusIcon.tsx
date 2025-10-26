import Icon from '~/components/icon/icon';
import type { IconProps } from '~/components/icon/types';

export const PlusIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <polygon points="23 11 23 13 13 13 13 23 11 23 11 13 1 13 1 11 11 11 11 1 13 1 13 11 23 11" />
      </svg>
    </Icon>
  );
};
