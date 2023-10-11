import * as React from 'react';
export const TestComponent = props => {
  const loaderImage = React.useRef<HTMLImageElement | null>(null);
  const { src, preLoadState, scenarioHandler } = props;
  const [srcLocal, setSrcLocal] = React.useState('');
  const [loadState, setLoadState] = React.useState(false);

  React.useEffect(() => {
    const loadFail = preLoadState === ImageLoadState.Fail || loadState === ImageLoadState.Fail;
    if (!loadFail) {
      const { height, maxHeight, maxWidth, width } = this._getHeightsAndWidths();

      setLoadState(ImageLoadState.Loading);
      this.setState({
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
      const {
        host: { Image },
      } = this.props;
      loaderImage.current = new Image() as HTMLImageElement;

      // Trigger src update of image once preloading completes.
      loaderImage.current.addEventListener('load', this._loadImageEventListener, {
        once: true,
      });

      loaderImage.current.addEventListener('error', this._errorImageEventListener, {
        once: true,
      });
      // Preload image
      loaderImage.current.src = src;
    }
    return () => {
      loaderImage.current?.removeEventListener('load', this._loadImageEventListener);
      loaderImage.current?.removeEventListener('error', this._errorImageEventListener);
    };
  }, [src]);

  React.useEffect(() => {
    if (preLoadState === ImageLoadState.Succeed) {
      setSrcLocal(src);
    }
  }, [preLoadState, src]);

  return <div>Test</div>;
};
