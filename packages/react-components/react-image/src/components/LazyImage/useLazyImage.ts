import * as React from 'react';
import { getNativeElementProps, mergeCallbacks, slot } from '@fluentui/react-utilities';
import { ImageLoadState, ImageSizeTypes, type LazyImageProps, type LazyImageState } from './LazyImage.types';
import { useInitialImageState } from '../../utils/useInitialLazyImageState';
import { getImageTypeAccordingToTheImageSize } from '../../utils/lazyImageSizeUtils';

/**
 * Create the state required to render LazyImage.
 *
 * The returned state can be modified with hooks such as useLazyImageStyles_unstable,
 * before being passed to renderLazyImage_unstable.
 *
 * @param props - props from this instance of LazyImage
 * @param ref - reference to root HTMLElement of LazyImage
 */
export const useLazyImage_unstable = (props: LazyImageProps, ref: React.Ref<HTMLElement>): LazyImageState => {
  const initialState = useInitialImageState(props);

  const { preLoadState, placeholder } = props;

  const [src, setSrc] = React.useState(initialState.src);
  const [loadState, setLoadState] = React.useState(initialState.loadState);
  const [showAnimation, setShowAnimation] = React.useState(true);
  // const [width, setWidth] = React.useState(initialState.width);
  // const [height, setHeight] = React.useState(initialState.height);
  // const dataTid = `lazy-image-${loadState}`;

  const showImage = (): boolean => {
    return preLoadState === ImageLoadState.Succeed || loadState === ImageLoadState.Succeed;
  };
  const shouldAddPlaceholder = (): boolean => {
    if (showImage()) {
      return false;
    }
    return !!placeholder;
  };

  if (initialState.width && initialState.height) {
    let imageType: ImageSizeTypes = ImageSizeTypes.NONE;
    if (props.isImageInlineOrAttached) {
      imageType = getImageTypeAccordingToTheImageSize(initialState.width, initialState.height);
    }
  }

  const animation: LazyImageState['animation'] = slot.optional(props.animation || {}, {
    defaultProps: {},
    elementType: 'div',
  });

  let placeholderSlot: LazyImageState['placeholder'];
  if (!props.placeholder || !shouldAddPlaceholder()) {
    placeholderSlot = undefined;
  } else {
    placeholderSlot = slot.optional(
      {
        children:
          loadState === ImageLoadState.Fail || preLoadState === ImageLoadState.Fail
            ? placeholder?.failureCbElem
            : placeholder?.loadingCbElem,
      },
      {
        defaultProps: {},
        elementType: 'div',
      },
    );
  }

  let image: LazyImageState['image'] = slot.optional(
    { ...props.image, src },
    {
      defaultProps: {
        alt: props.alt,
        role: 'img',
        id: props.id,
        // 'data-tid': dataTid,
        'aria-label': props.alt,
        // 'data-image-type': props.isImageInlineOrAttached ? ImageSizeTypes.STANDARD : null,
        // 'data-image-mode': props.dataImageMode,
        style: {
          maxWidth: `${initialState.maxWidth}px`,
          maxHeight: `${initialState.maxHeight}px`,
          width: `${initialState.width}px`,
          height: `${initialState.height}px`,
        },
      },
      elementType: 'img',
    },
  );

  // Image shouldn't be rendered if its src is not set
  if (!props.image?.src) {
    image = undefined;
  }

  if (image) {
    image.onLoad = mergeCallbacks(image.onLoad, () => {
      if (props.scenarioHandler) {
        props.scenarioHandler(ImageLoadState.Succeed);
      }
      setSrc(props.image?.src);
      setLoadState(ImageLoadState.Succeed);
      setShowAnimation(false);
    });

    image.onError = mergeCallbacks(image.onError, () => {
      if (props.scenarioHandler) {
        props.scenarioHandler(ImageLoadState.Fail);
      }
      setSrc(props.image?.src);
      setLoadState(ImageLoadState.Fail);
      setShowAnimation(false);
    });
  }

  return {
    width: initialState.width,
    height: initialState.height,
    maxWidth: initialState.maxHeight,
    maxHeight: initialState.maxHeight,
    showAnimation,
    showImage: showImage(),
    showPlaceholder: shouldAddPlaceholder(),
    components: {
      root: 'div',
      animation: 'div',
      image: 'img',
      placeholder: 'div',
    },
    root: slot.always(
      getNativeElementProps('div', {
        ref, //should it be on img component
        ...props,
      }),
      { elementType: 'div' },
    ),
    animation,
    image,
    placeholder: placeholderSlot,
  };
};
