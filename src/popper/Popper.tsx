// @flow strict
import {
  State,
  Placement,
  PositioningStrategy,
  VirtualElement,
  StrictModifiers,
  Modifier,
} from '@popperjs/core/lib';
import { ManagerReferenceNodeContext } from './Manager';
import type { Ref } from './RefTypes';
import { unwrapArray, setRef } from './utils';
import usePopper from 'solid-popper';
import { createEffect, createMemo, createSignal, useContext } from 'solid-js';

const NOOP = () => void 0;
const NOOP_PROMISE = () => Promise.resolve(null);
const EMPTY_MODIFIERS: any[] = [];

export function Popper({
  placement = 'bottom',
  strategy = 'absolute',
  modifiers = EMPTY_MODIFIERS,
  referenceElement,
  onFirstUpdate,
  innerRef,
  children,
}: any): any {
  const referenceNode = useContext(ManagerReferenceNodeContext);

  const [popperElement, setPopperElement] = createSignal(null);
  const [arrowElement, setArrowElement] = createSignal(null);

  createEffect(() => {
    setRef(innerRef, popperElement)
  });

  const options = createMemo(
    () => ({
      placement,
      strategy,
      onFirstUpdate,
      modifiers: [
        ...modifiers,
        {
          name: 'arrow',
          enabled: arrowElement != null,
          options: { element: arrowElement },
        },
      ],
    }),
  );

   const instance: any = usePopper(
    referenceElement || referenceNode,
    popperElement,
    options()
  );
  const { state, styles, forceUpdate, update } = instance

  const childrenProps = createMemo(
    () => ({
      ref: setPopperElement,
      style: styles.popper,
      placement: state ? state.placement : placement,
      hasPopperEscaped:
        state && state.modifiersData.hide
          ? state.modifiersData.hide.hasPopperEscaped
          : null,
      isReferenceHidden:
        state && state.modifiersData.hide
          ? state.modifiersData.hide.isReferenceHidden
          : null,
      arrowProps: {
        style: styles.arrow,
        ref: setArrowElement,
      },
      forceUpdate: forceUpdate || NOOP,
      update: update || NOOP_PROMISE,
    }),
  );

  return unwrapArray(children)(childrenProps);
}