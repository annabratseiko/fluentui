import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

//import { MultiStackedBarChartExample } from './MultiStackedBarChart.Example';
import { MultiStackedBarChartWithPlaceholderExample } from './MultiStackedBarChartWithPlaceHolder.Example';
import { MultiStackedBarChartVariantExample } from './MultiStackedBarChart.Variant.Example';

//const MultiStackedBarChartExampleCode =
//  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/MultiStackedBarChart/MultiStackedBarChart.Example.tsx') as string;
const MultiStackedBarChartWithPlaceholderExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/MultiStackedBarChart/MultiStackedBarChartWithPlaceHolder.Example.tsx') as string;
const MultiStackedBarChartVariantExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/MultiStackedBarChart/MultiStackedBarChart.Variant.Example.tsx') as string;

export const MultiStackedBarChartPageProps: IDocPageProps = {
  title: 'MultiStackedBarChart',
  componentName: 'MultiStackedBarChart',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/react-charting/src/components/MultiStackedBarChart',
  examples: [
    //{
    //  title: 'MultiStackedBarChart N/M',
    //  code: MultiStackedBarChartExampleCode,
    //  view: <MultiStackedBarChartExample />,
    //},
    {
      title: 'MultiStackedBarChart absolute scale',
      code: MultiStackedBarChartVariantExampleCode,
      view: <MultiStackedBarChartVariantExample />,
    },
    {
      title: 'MultiStackedBarChart placeholder',
      code: MultiStackedBarChartWithPlaceholderExampleCode,
      view: <MultiStackedBarChartWithPlaceholderExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/MultiStackedBarChart/docs/MultiStackedBarChartOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/MultiStackedBarChart/docs/MultiStackedBarChartBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
