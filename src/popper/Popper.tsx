import { ManagerReferenceNodeContext } from './Manager';
import { unwrapArray, setRef } from './utils';
import usePopper from 'solid-popper';
import { createEffect, createMemo, createSignal, mergeProps, splitProps, useContext } from 'solid-js';

const NOOP = () => void 0;
const NOOP_PROMISE = () => Promise.resolve(null);
const EMPTY_MODIFIERS: any[] = [];

const defaultProps = {
  placement: 'bottom',
  strategy: 'absolute',
  modifiers: EMPTY_MODIFIERS,
}

export function Popper(props: any) {
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
  ["referenceElement", "onFirstUpdate", "placement", "strategy", "modifiers"]);

  const [referenceNode, _] = useContext(ManagerReferenceNodeContext);
  const [popperElement, setPopperElement] = createSignal(null);
  const [arrowElement, setArrowElement] = createSignal(null);

  createEffect(() => {
    setRef(props.ref, popperElement)
  });

  const options = createMemo(
    () => ({
      placement: local.placement,
      strategy: local.strategy,
      onFirstUpdate: local.onFirstUpdate,
      modifiers: [
        ...local.modifiers,
        {
          name: 'arrow',
          enabled: arrowElement != null,
          options: { element: arrowElement },
        },
      ],
    }),
  );

   const instance: any = usePopper(
    local.referenceElement || referenceNode,
    popperElement,
    options()
  );
  const { state, styles, forceUpdate, update } = instance

  const childrenProps = createMemo(
    () => ({
      ref: setPopperElement,
      style: styles.popper,
      placement: state ? state.placement : local.placement,
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

  return unwrapArray(attributes.children)(childrenProps);
}