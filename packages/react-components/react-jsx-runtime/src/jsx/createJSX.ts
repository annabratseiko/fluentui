import { isSlot } from '@fluentui/react-utilities';
import * as React from 'react';
import { createCompatSlotComponent } from '../utils/createCompatSlotComponent';
import { JSXRuntime, JSXSlotRuntime } from '../utils/types';

export const createJSX =
  (runtime: JSXRuntime, slotRuntime: JSXSlotRuntime) =>
  <Props extends {}>(
    type: React.ElementType<Props>,
    overrideProps: Props | null,
    key?: React.Key,
    source?: unknown,
    self?: unknown,
  ): React.ReactElement<Props> => {
    // TODO:
    // this is for backwards compatibility with getSlotsNext
    // it should be removed once getSlotsNext is obsolete
    if (isSlot<Props>(overrideProps)) {
      return slotRuntime<Props>(createCompatSlotComponent(type, overrideProps), null, key, source, self);
    }
    if (isSlot<Props>(type)) {
      return slotRuntime(type, overrideProps, key, source, self);
    }
    return runtime(type, overrideProps, key, source, self);
  };
