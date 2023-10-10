import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { LazyImageSlots, LazyImageState } from './LazyImage.types';

export const lazyImageClassNames: SlotClassNames<LazyImageSlots> = {
  root: 'fui-LazyImage',
  animation: 'fui-LazyImage__animation',
  image: 'fui-LazyImage__image',
  placeholder: 'fui-LazyImage__placeholder',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'relative', //if shouldAddPlaceholder
  },

  animation: {},

  image: {},
});

/**
 * Apply styling to the LazyImage slots based on the state
 */
export const useLazyImageStyles_unstable = (state: LazyImageState): LazyImageState => {
  const styles = useStyles();
  state.root.className = mergeClasses(lazyImageClassNames.root, styles.root, state.root.className);
  if (state.animation) {
    state.animation.className = mergeClasses(lazyImageClassNames.animation, styles.animation);
  }
  if (state.image) {
    state.image.className = mergeClasses(lazyImageClassNames.image, styles.image, state.image.className);
  }
  if (state.placeholder) {
    state.placeholder.className = mergeClasses(lazyImageClassNames.placeholder, state.placeholder.className);
  }

  return state;
};
