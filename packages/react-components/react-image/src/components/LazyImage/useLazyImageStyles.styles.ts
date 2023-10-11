import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
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
  fixedAspectRatio: {
    alignItems: 'center',
    height: 'auto',
    justifyContent: 'center',
    ...shorthands.overflow('hidden'),
    width: '100%',
  },

  inlineImageWrapper: {
    display: 'inline-block',
  },

  // ...(!isImageInlineOrAttached && {
  //   maxHeight: fixedAspectRatio ? `${maxHeight}rem` : undefined,
  //   maxWidth: `${maxWidth}rem`,
  // }),

  // should be added to the image
  animation: {
    // keyframe: {
    //   from: {
    //     opacity: 0,
    //   },
    //   to: {
    //     opacity: 1,
    //   },
    // },
    // timingFunction: 'cubic-bezier(0.3, 0, 0.6, 1)',
  },

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
