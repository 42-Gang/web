import { ReactNode } from 'react';

import { useNavigation } from './hooks/useNavigation';

type StepNavigatorProps = {
  items: string[];
  onSelect: (index: number) => void;
  initial?: number;
  renderItem: (props: {
    text: string;
    index: number;
    isSelected: boolean;
    isCurrent: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
    onClick: () => void;
  }) => ReactNode;
  renderContainer: (props: {
    children: ReactNode;
    onFocus: () => void;
    onBlur: () => void;
  }) => ReactNode;
};

const StepNavigator = ({
  items,
  onSelect,
  initial = 0,
  renderItem,
  renderContainer,
}: StepNavigatorProps) => {
  const { state, current, actions } = useNavigation({ items, onSelect, initial });

  if (items.length === 0) {
    return null;
  }

  const itemsList = items.map((text, i) =>
    renderItem({
      text,
      index: i,
      isSelected: i === state.selected,
      isCurrent: i === current,
      onMouseEnter: () => actions.onHover(i),
      onMouseLeave: () => actions.onHover(null),
      onFocus: () => actions.onFocus(i),
      onBlur: () => actions.onFocus(null),
      onClick: () => actions.onSelect(i),
    }),
  );

  return renderContainer({
    children: itemsList,
    onFocus: actions.onContainerFocus,
    onBlur: actions.onContainerBlur,
  });
};

export { StepNavigator };

export { DefaultStepNavigator } from './variants/default-step-navigator';
