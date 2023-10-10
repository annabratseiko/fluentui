/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { LazyImageState, LazyImageSlots } from './LazyImage.types';

/**
 * Render the final JSX of LazyImage
 */
export const renderLazyImage_unstable = (state: LazyImageState) => {
  assertSlots<LazyImageSlots>(state);

  return (
    <state.root>
      {state.animation && state.showAnimation && <state.animation />}
      {state.image && <state.image />}
    </state.root>
  );
};
