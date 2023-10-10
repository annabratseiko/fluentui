import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useLazyImage_unstable } from './useLazyImage';
import { renderLazyImage_unstable } from './renderLazyImage';
import { useLazyImageStyles_unstable } from './useLazyImageStyles.styles';
import type { LazyImageProps } from './LazyImage.types';

/**
 * LazyImage component - TODO: add more docs
 */
export const LazyImage: ForwardRefComponent<LazyImageProps> = React.forwardRef((props, ref) => {
  const state = useLazyImage_unstable(props, ref);

  useLazyImageStyles_unstable(state);
  return renderLazyImage_unstable(state);
});

LazyImage.displayName = 'LazyImage';
