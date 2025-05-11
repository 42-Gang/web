import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import { StepNavigator } from '@/components/ui';

import * as styles from './styles.css';

type DefaultStepNavigatorProps = Omit<ComponentProps<'div'>, 'onSelect'> & {
  items: string[];
  onSelect: (index: number) => void;
  initial?: number;
};

export const DefaultStepNavigator = ({
  items,
  onSelect,
  initial,
  ...props
}: DefaultStepNavigatorProps) => {
  return (
    <StepNavigator
      items={items}
      onSelect={onSelect}
      initial={initial}
      renderContainer={({ children }) => (
        <nav
          className={styles.navigation}
          aria-label="단계 네비게이터"
          role="navigation"
          {...props}
        >
          <ul className={styles.list} role="list">
            {children}
          </ul>
        </nav>
      )}
      renderItem={({
        text,
        isSelected,
        isCurrent,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        onClick,
      }) => (
        <li className={styles.item} key={text} role="listitem">
          <button
            className={styles.button}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onFocus={onFocus}
            onBlur={onBlur}
            onClick={onClick}
            aria-current={isSelected}
            aria-label={`${text} 단계 선택`}
            tabIndex={0}
          >
            <span className={styles.indicatorWrapper}>
              <span className={clsx(styles.indicator, isCurrent && styles.indicatorActive)}>
                ▶
              </span>
            </span>
            <p className={styles.text}>{text}</p>
          </button>
        </li>
      )}
    />
  );
};
