import * as React from 'react';
import { getNativeElementProps, useId, slot } from '@fluentui/react-utilities';
import { Button } from '../Button/Button';
import { MenuButton } from '../MenuButton/MenuButton';
import type { SplitButtonProps, SplitButtonState } from './SplitButton.types';

/**
 * Given user props, defines default props for the SplitButton and returns processed state.
 * @param props - User provided props to the SplitButton component.
 * @param ref - User provided ref to be passed to the SplitButton component.
 */
export const useSplitButton_unstable = (
  props: SplitButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): SplitButtonState => {
  const {
    appearance = 'secondary',
    children,
    disabled = false,
    disabledFocusable = false,
    icon,
    iconPosition = 'before',
    menuButton,
    menuIcon,
    primaryActionButton,
    shape = 'rounded',
    size = 'medium',
  } = props;

  const baseId = useId('splitButton-');

  const menuButtonShorthand = slot.optional(menuButton, {
    defaultProps: {
      appearance,
      disabled,
      disabledFocusable,
      menuIcon,
      shape,
      size,
    },
    renderByDefault: true,
    elementType: MenuButton,
  });
  const primaryActionButtonShorthand = slot.optional(primaryActionButton, {
    defaultProps: {
      appearance,
      children,
      disabled,
      disabledFocusable,
      icon,
      iconPosition,
      id: baseId + '__primaryActionButton',
      shape,
      size,
    },
    renderByDefault: true,
    elementType: Button,
  });

  // Resolve menu button's aria-labelledby to be labelled by the primary action button if no label was provided by the
  // user.
  if (
    menuButtonShorthand &&
    primaryActionButtonShorthand &&
    !menuButtonShorthand['aria-label'] &&
    !menuButtonShorthand['aria-labelledby']
  ) {
    menuButtonShorthand['aria-labelledby'] = primaryActionButtonShorthand.id;
  }

  return {
    // Props passed at the top-level
    appearance,
    disabled,
    disabledFocusable,
    iconPosition,
    shape,
    size, // Slots definition
    components: { root: 'div', menuButton: MenuButton, primaryActionButton: Button },
    root: slot.always(getNativeElementProps('div', { ref, ...props }), { elementType: 'div' }),
    menuButton: menuButtonShorthand,
    primaryActionButton: primaryActionButtonShorthand,
  };
};
