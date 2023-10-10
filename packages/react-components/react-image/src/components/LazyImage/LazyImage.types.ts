import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { ImageProps } from '../Image/Image.types';

export type LazyImageSlots = {
  root: Slot<'div'>;
  animation?: Slot<'div'>;
  image: Slot<'img'>;
  placeholder?: Slot<'div'>;
};

/**
 * LazyImage Props
 */
export type LazyImageProps = ComponentProps<LazyImageSlots> &
  ImageProps & {
    // Disables preload support for LazyImage. The responsibility for preloading falls to the calling component.
    disableImagePreload?: boolean;
    // Should the aspect ratio of the image be fixed based upon the passed in width and height?
    fixedAspectRatio?: boolean;
    // Known full sized height in pixels of the image, or undefined if unknown
    fullSizeHeight?: number | undefined;
    // Known full sized width in pixels of the image, or undefined if unknown
    fullSizeWidth?: number | undefined;
    /** Known height in pixels of the image, or undefined if unknonwn.
     * @default -1
     */
    height?: number;
    // Optional id for the image.
    id?: string;
    src?: string;
    /** Known width in pixels of the image, or undefined if unknonwn.
     * @default -1
     */
    width?: number;
    // Whether to apply placeholder when image loading.
    placeholder?: Placeholder;
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
    // Whether the image rendered in single or in grid mode
    dataImageMode?: string;
    'data-tid'?: string;
  };
/**
 * State used in rendering LazyImage
 */
export type LazyImageState = ComponentState<LazyImageSlots> &
  Required<Pick<LazyImageProps, 'width' | 'height'>> & {
    showImage: boolean;
    showPlaceholder: boolean;
    showAnimation: boolean;
    maxWidth: number;
    maxHeight: number;
  };

export type MaxInfo = { maxHeight: number; maxWidth?: number };
export type SizeInfo = { height?: number; width?: number } & MaxInfo;

export interface Placeholder {
  // Failure callback element.
  failureCbElem?: React.ReactElement;
  // Loading callback element.
  loadingCbElem?: React.ReactElement;
}

export enum ImageLoadState {
  Fail,
  Loading,
  Succeed,
}

export enum ImageSizeTypes {
  ULTRA_WIDE = 'ultra-wide',
  SUPER_SMALL = 'super-small',
  THIN = 'thin',
  TALL = 'tall',
  STANDARD = 'standard',
  /**  For images when enableImprovedImageHandling flag is off */
  NONE = 'none',
}
