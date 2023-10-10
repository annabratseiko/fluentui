import { LazyImageProps, MaxInfo, SizeInfo } from '../LazyImage';

export enum ImageSizeTypes {
  ULTRA_WIDE = 'ultra-wide',
  SUPER_SMALL = 'super-small',
  THIN = 'thin',
  TALL = 'tall',
  STANDARD = 'standard',
  /**  For images when enableImprovedImageHandling flag is off */
  NONE = 'none',
}
/**
 * The constants below could be moved to props to enable dynamic functionality
 * if the behavior becomes necessary. Right now, the component is only used by
 * the message content, which requires strict sizing limitations. A lightbox
 * implementation, for example, would likely require different constraints.
 */

// Define a tall portrait as one where an image’s height is twice its width.
export const TALL_PORTRAIT_ASPECT_RATIO = 0.5;
// Define the base font size for the application context.
export const BASE_FONT_SIZE_PX = 10;
// Limit maxHeight to 48rem (480px).
export const MAX_HEIGHT_REM = 48;
// Limit maxWidth to 62rem (620px).
export const MAX_WIDTH_REM = 62;
// Limit maxHeight to 20rem (200px) for images with unknonw width & height.
export const MAX_HEIGHT_REM_FOR_IMAGES_WITH_UNKNOWN_MEASUREMENTS = 20;
// Animation duration for images in a message when they replace initial placeholder
export const IMAGE_FADE_IN_ANIMATION_DURATION = '333ms';
export const ULTRA_WIDE_IMAGE_MIN_WIDTH = 812;
export const ULTRA_WIDE_IMAGE_MIN_HEIGHT = 406;
export const STANDARD_WIDTH_OR_HEIGHT = 180;

export const DEFAULT_MIN_ULTRA_WIDE_ASPECT_RATIO = ULTRA_WIDE_IMAGE_MIN_WIDTH / ULTRA_WIDE_IMAGE_MIN_HEIGHT;

export const getMaxHeightAndMaxWidth = (height: number, width: number, isVideoThumbnail?: boolean): MaxInfo => {
  const aspectRatio = width / height;
  const isTallPortrait = aspectRatio < TALL_PORTRAIT_ASPECT_RATIO;
  let maxHeight = height / BASE_FONT_SIZE_PX;
  let maxWidth = width / BASE_FONT_SIZE_PX > MAX_WIDTH_REM ? MAX_WIDTH_REM : width / BASE_FONT_SIZE_PX;

  if (maxHeight > MAX_HEIGHT_REM || isTallPortrait) {
    if (!isVideoThumbnail) {
      maxHeight = MAX_HEIGHT_REM;
    }
    maxWidth = aspectRatio * maxHeight;
  }

  return { maxHeight, maxWidth };
};

export const getHeightsAndWidths = (props: LazyImageProps): SizeInfo => {
  const { width, height } = props;

  let maxHeight = MAX_HEIGHT_REM_FOR_IMAGES_WITH_UNKNOWN_MEASUREMENTS;
  let maxWidth;

  if (width && height) {
    const maxHeightAndMaxWidth = getMaxHeightAndMaxWidth(height, width);
    maxHeight = maxHeightAndMaxWidth.maxHeight;
    maxWidth = maxHeightAndMaxWidth.maxWidth;
  }

  return { height, maxHeight, maxWidth, width };
};

/**
 * Defines the image size type according to its size
 *
 * @param {number} width
 * @param {number} height
 * @returns returns image size type
 */

export const getImageTypeAccordingToTheImageSize = (width: number, height: number): ImageSizeTypes => {
  if (height / width >= DEFAULT_MIN_ULTRA_WIDE_ASPECT_RATIO) {
    return ImageSizeTypes.TALL;
  }

  const heightSmallerThanStandard = height < STANDARD_WIDTH_OR_HEIGHT;

  if (width / height >= DEFAULT_MIN_ULTRA_WIDE_ASPECT_RATIO) {
    return heightSmallerThanStandard ? ImageSizeTypes.THIN : ImageSizeTypes.ULTRA_WIDE;
  }

  if (heightSmallerThanStandard) {
    return ImageSizeTypes.SUPER_SMALL;
  }

  return ImageSizeTypes.STANDARD;
};
