import { StepNavigator } from '@/components/ui';

type GameSelectStepNavigatorProps = {
  items: string[];
  onConfirm: (index: number) => void;
  getClassName: (text: string) => string;
  wrapperClassName: string;
  showText?: boolean;
};

export const GameSelectStepNavigator = ({
  items,
  onConfirm,
  getClassName,
  wrapperClassName,
  showText = true,
}: GameSelectStepNavigatorProps) => {
  return (
    <StepNavigator
      items={items}
      initial={0}
      onSelect={onConfirm}
      renderContainer={({ children, onFocus, onBlur }) => (
        <div className={wrapperClassName} onFocus={onFocus} onBlur={onBlur} tabIndex={0}>
          {children}
        </div>
      )}
      renderItem={({
        text,
        isSelected,
        isCurrent,
        onClick,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
      }) => (
        <button
          key={text}
          className={getClassName(text)}
          data-current={isCurrent || undefined}
          aria-current={isSelected}
          aria-label={`${text} 단계 선택`}
          style={{ outline: isCurrent ? '2px solid white' : 'none' }}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {showText && text}
        </button>
      )}
    />
  );
};
