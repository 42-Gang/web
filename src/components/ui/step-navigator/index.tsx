/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from '@emotion/react';
import { useEffect, useState } from 'react';

import * as styles from './styles';

type StepNavigatorProps = {
  items: string[];
  onSelect: (index: number) => void;
  initial?: number;
  css?: Interpolation<Theme>;
};

export const StepNavigator = ({ items, onSelect, initial = 0, css }: StepNavigatorProps) => {
  const [selected, setSelected] = useState<number>(initial);
  const [hovered, setHovered] = useState<number | null>(null);

  const current: number = hovered ?? selected;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        setSelected((prev) => (prev - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowDown') {
        setSelected((prev) => (prev + 1) % items.length);
      } else if (e.key === 'Enter') {
        onSelect(selected);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, items.length, onSelect]);

  return (
    <styles.Nav aria-label="단계 네비게이터" css={css}>
      <styles.List>
        {items.map((text, i) => (
          <styles.Item key={text}>
            <styles.Button
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                setSelected(i);
                onSelect(i);
              }}
              aria-current={i === selected}
              aria-label={`${text} 단계 선택`}
            >
              <styles.IndicatorWrapper>
                <styles.Indicator active={i === current}>▶</styles.Indicator>
              </styles.IndicatorWrapper>
              <styles.Text>{text}</styles.Text>
            </styles.Button>
          </styles.Item>
        ))}
      </styles.List>
    </styles.Nav>
  );
};
