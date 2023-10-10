import * as React from 'react';
import { LazyImage, LazyImageProps } from '@fluentui/react-components';

export const Default = (props: Partial<LazyImageProps>) => (
  <LazyImage
    image={{ src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg' }}
    {...props}
  />
);
