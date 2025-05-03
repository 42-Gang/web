/** @jsxImportSource @emotion/react */
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { StepNavigator } from '@/components/ui';

type DefaultStepNavigatorProps = {
  items: string[];
  onSelect: (index: number) => void;
  initial?: number;
};

export const DefaultStepNavigator = ({ items, onSelect, initial }: DefaultStepNavigatorProps) => {
  return (
    <StepNavigator
      items={items}
      onSelect={onSelect}
      initial={initial}
      renderContainer={({ children, css }) => (
        <Nav aria-label="단계 네비게이터" css={css} role="navigation">
          <List role="list">{children}</List>
        </Nav>
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
        <Item key={text} role="listitem">
          <Button
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onFocus={onFocus}
            onBlur={onBlur}
            onClick={onClick}
            aria-current={isSelected}
            aria-label={`${text} 단계 선택`}
            tabIndex={0}
          >
            <IndicatorWrapper>
              <Indicator active={isCurrent}>▶</Indicator>
            </IndicatorWrapper>
            <Text>{text}</Text>
          </Button>
        </Item>
      )}
    />
  );
};

const fadeSlide = keyframes`
  from {
    transform: translateX(-6px);
  }
  to {
    transform: translateX(0);
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  font-family: 'Tiny5', sans-serif;
  font-size: 32px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
`;

const Item = styled.li`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Button = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 10px 8px;
  font: inherit;
  color: inherit;
  line-height: 1.2;
  cursor: pointer;
  border: none;
  background: none;
`;

const IndicatorWrapper = styled.span`
  position: absolute;
  left: -28px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
  pointer-events: none;
`;

const Indicator = styled.span<{ active?: boolean }>`
  display: inline-block;
  font-size: 24px;
  opacity: ${(p) => (p.active ? 1 : 0)};
  transform: translateX(${(p) => (p.active ? '0' : '-6px')});
  transition: transform 250ms ease, opacity 250ms ease;
  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
`;

const Text = styled.span`
  font-weight: inherit;
  text-align: center;
  transition: font-weight 250ms ease;
`;
