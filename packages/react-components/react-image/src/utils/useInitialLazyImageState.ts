import { ImageLoadState, LazyImageProps } from '../LazyImage';
import { MAX_HEIGHT_REM_FOR_IMAGES_WITH_UNKNOWN_MEASUREMENTS, getMaxHeightAndMaxWidth } from './lazyImageSizeUtils';

export const useInitialImageState = (props: LazyImageProps) => {
  const { width, height, isVideoThumbnail, preLoadState } = props;
  const isImagePreLoaded = preLoadState === ImageLoadState.Succeed;
  let maxHeight = MAX_HEIGHT_REM_FOR_IMAGES_WITH_UNKNOWN_MEASUREMENTS;
  let maxWidth;
  let viewBox;

  if (width && height) {
    const maxHeightAndMaxWidth = getMaxHeightAndMaxWidth(height, width, isVideoThumbnail);
    maxHeight = maxHeightAndMaxWidth.maxHeight;
    maxWidth = maxHeightAndMaxWidth.maxWidth;
    /**
     * Permit lazy loading with an appropriately proportioned viewbox when width and height
     * are both provided.
     */
    viewBox = `0 0 ${width} ${height}`;
  } else {
    /**
     * Permit lazy loading with MAX_HEIGHT_REM_FOR_IMAGES_WITH_UNKNOWN_MEASUREMENTS minimum height
     * viewbox when width or height are unknown.
     */
    viewBox = `0 0 1 ${maxHeight}`;
  }

  const src = isImagePreLoaded
    ? props.image?.src
    : `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"%3E%3C/svg%3E`;

  return {
    height: height || -1,
    maxHeight,
    maxWidth,
    src,
    defaultSrc: props.image?.src,
    width: width || -1,
    loadState: isImagePreLoaded ? ImageLoadState.Succeed : ImageLoadState.Loading,
  };
};
