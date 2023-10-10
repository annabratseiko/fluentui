import { LazyImage } from '@fluentui/react-components';

import descriptionMd from './LazyImageDescription.md';
import bestPracticesMd from './LazyImageBestPractices.md';

export { Default } from './LazyImageDefault.stories';

export default {
  title: 'Preview Components/LazyImage',
  component: LazyImage,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
