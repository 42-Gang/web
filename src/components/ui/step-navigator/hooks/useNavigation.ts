import { useEffect, useState, useCallback, useRef } from 'react';

type NavigationState = {
  selected: number;
  hovered: number | null;
  focused: number | null;
};

type NavigationActions = {
  onSelect: (index: number) => void;
  onHover: (index: number | null) => void;
  onFocus: (index: number | null) => void;
  onContainerFocus: () => void;
  onContainerBlur: () => void;
};

type UseNavigationProps = {
  items: string[];
  onSelect: (index: number) => void;
  initial?: number;
};

export const useNavigation = ({ items, onSelect, initial = 0 }: UseNavigationProps) => {
  const validInitial = items.length > 0 ? Math.min(Math.max(0, initial), items.length - 1) : 0;
  const isFocused = useRef(false);

  const [state, setState] = useState<NavigationState>({
    selected: validInitial,
    hovered: null,
    focused: null,
  });

  const current: number = state.hovered ?? state.focused ?? state.selected;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (items.length === 0) return;

      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const newIndex = (state.selected - 1 + items.length) % items.length;
        setState((prev) => ({
          ...prev,
          selected: newIndex,
          focused: newIndex,
          hovered: null,
        }));
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const newIndex = (state.selected + 1) % items.length;
        setState((prev) => ({
          ...prev,
          selected: newIndex,
          focused: newIndex,
          hovered: null,
        }));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const targetIndex = state.focused ?? state.selected;
        setState((prev) => ({
          ...prev,
          selected: targetIndex,
          focused: null,
        }));
        onSelect(targetIndex);
      }
    },
    [state.selected, state.focused, items.length, onSelect],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const actions: NavigationActions = {
    onSelect: (index: number) => {
      setState((prev) => ({
        ...prev,
        selected: index,
        focused: null,
      }));
      onSelect(index);
    },
    onHover: (index: number | null) => {
      setState((prev) => ({ ...prev, hovered: index }));
    },
    onFocus: (index: number | null) => {
      setState((prev) => ({ ...prev, focused: index }));
    },
    onContainerFocus: () => {
      isFocused.current = true;
    },
    onContainerBlur: () => {
      isFocused.current = false;
    },
  };

  return { state, current, actions };
};
