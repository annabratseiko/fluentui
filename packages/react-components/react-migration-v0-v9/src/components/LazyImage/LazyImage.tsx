import * as React from 'react';
import { useLazyImageStyles } from './LazyImage.styles';
import { ImageProps } from '@fluentui/react-components';

type MaxInfo = { maxHeight: number; maxWidth?: number };
type SizeInfo = { height?: number; width?: number } & MaxInfo;

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

export enum ImageLoadState {
  Fail,
  Loading,
  Succeed,
}

export interface IPlaceholder {
  // Failure callback element.
  failureCbElem?: React.ReactElement;
  // Loading callback element.
  loadingCbElem?: React.ReactElement;
}

export interface ILazyImageState {
  // Computed height of the image.
  height: number | undefined;
  // Computed maxHeight of the image.
  maxHeight: number;
  // Computed maxWidth of the image.
  maxWidth: number | undefined;
  // Computed src of the image, either an inline data:image/svg+xml or the actual src.
  src: string;
  // Computed width of the image.
  width: number | undefined;
  // Image load status.
  loadState?: ImageLoadState;
}

export interface ILazyImageProps extends Omit<ImageProps, 'placeholder'> {
  // Optional alt text for the image.
  alt?: string;
  // Disables preload support for LazyImage. The responsibility for preloading falls to the calling component.
  disableImagePreload?: boolean;
  // Should the aspect ratio of the image be fixed based upon the passed in width and height?
  fixedAspectRatio?: boolean;
  // Known full sized height in pixels of the image, or undefined if unknown
  fullSizeHeight?: number | undefined;
  // Known full sized width in pixels of the image, or undefined if unknown
  fullSizeWidth?: number | undefined;
  // Known height in pixels of the image, or undefined if unknonwn.
  height?: number | undefined;
  // Optional id for the image.
  id?: string;
  // Optional itemType for the image.
  itemType?: string;
  /**
   * Optional key for the image (necessary when multiple LazyImage Components are
   * rendered as siblings).
   */
  key?: string;
  // Actual src of the image.
  src: string;
  // Known width in pixels of the image, or undefined if unknonwn.
  width?: number | undefined;
  // Whether to apply placeholder when image loading.
  placeholder?: IPlaceholder;
  // Image preload status. It's used when consumers want to do their own custom image loading
  preLoadState?: ImageLoadState;
  // Log scenario data callback
  scenarioHandler?: (status: ImageLoadState, errMsg?: string) => void;
  // Whether the wrapper of image is displayed inline or not
  isInlineImageWrapper?: boolean;
  // Whether the image is being used as a video thumbnail
  isVideoThumbnail?: boolean;
  // Whether the image is attachment or pasted one
  isImageInlineOrAttached?: boolean;
  // Whether the image is an icon
  isMosaicIcon?: boolean;
  // Whether the image rendered in single or in grid mode
  dataImageMode?: string;
}

export const LazyImage = (props: ILazyImageProps) => {
  const state = getInitialState(props);

  const loaderImage = React.useRef<HTMLImageElement | null>(null);
  const { src, preLoadState, scenarioHandler } = props;
  const [srcLocal, setSrcLocal] = React.useState('');
  const [loadState, setLoadState] = React.useState(state.loadState);
  const [measurements, setMeasurements] = React.useState<SizeInfo>({
    maxHeight: MAX_HEIGHT_REM_FOR_IMAGES_WITH_UNKNOWN_MEASUREMENTS,
  });

  const styles = useLazyImageStyles();

  const loadImageEventListener = () => {
    if (scenarioHandler) {
      scenarioHandler(ImageLoadState.Succeed);
    }
    setSrcLocal(src);
    setLoadState(ImageLoadState.Succeed);
  };

  const errorImageEventListener = () => {
    if (scenarioHandler) {
      scenarioHandler(ImageLoadState.Fail);
    }
    setSrcLocal(src);
    setLoadState(ImageLoadState.Fail);
  };

  React.useEffect(() => {
    const loadFail = preLoadState === ImageLoadState.Fail || loadState === ImageLoadState.Fail;
    if (!loadFail) {
      const { height, maxHeight, maxWidth, width } = getHeightsAndWidths();

      setLoadState(ImageLoadState.Loading);
      setMeasurements({
        height,
        maxHeight,
        maxWidth,
        width,
      });
    } else if (loadFail && scenarioHandler) {
      scenarioHandler(ImageLoadState.Fail);
    }
  }, [src, preLoadState, loadState]);

  React.useEffect(() => {
    if (!isEmpty(src)) {
      loaderImage.current = new Image() as HTMLImageElement;

      // Trigger src update of image once preloading completes.
      loaderImage.current.addEventListener('load', loadImageEventListener, {
        once: true,
      });

      loaderImage.current.addEventListener('error', errorImageEventListener, {
        once: true,
      });
      // Preload image
      loaderImage.current.src = src;
    }
    return () => {
      loaderImage.current?.removeEventListener('load', loadImageEventListener);
      loaderImage.current?.removeEventListener('error', errorImageEventListener);
    };
  }, [src]);

  React.useEffect(() => {
    if (preLoadState === ImageLoadState.Succeed) {
      setSrcLocal(src);
    }
  }, [preLoadState, src]);

  return <div>Test</div>;
};

export const getInitialState = (props: ILazyImageProps): ILazyImageState => {
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
    ? props.src
    : `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"%3E%3C/svg%3E`;

  return {
    height,
    maxHeight,
    maxWidth,
    src,
    width,
    loadState: isImagePreLoaded ? ImageLoadState.Succeed : ImageLoadState.Loading,
  };
};

export const getHeightsAndWidths = (width?: number, height?: number): SizeInfo => {
  let maxHeight = MAX_HEIGHT_REM_FOR_IMAGES_WITH_UNKNOWN_MEASUREMENTS;
  let maxWidth;

  if (width && height) {
    const maxHeightAndMaxWidth = getMaxHeightAndMaxWidth(height, width);
    maxHeight = maxHeightAndMaxWidth.maxHeight;
    maxWidth = maxHeightAndMaxWidth.maxWidth;
  }

  return { height, maxHeight, maxWidth, width };
};

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
