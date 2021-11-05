import { getTarget, classname } from './utils';
import { Fade } from './Fade';
import { createEffect, createSignal, mergeProps, splitProps } from 'solid-js';
import { Popper } from '../popper/Popper';
import { Portal as WebPortal } from 'solid-js/web';

function noop() {  }

type PropTypes = {
  children: any,
  className?: string
  popperClassName?: string,
  placement?: string,
  placementPrefix?: string,
  arrowClassName?: string,
  hideArrow?: boolean,
  tag?: any,
  isOpen: boolean,
  offset?: number[],
  fallbackPlacements?: any[],
  flip?: boolean,
  container?: any,
  target: any,
  modifiers?: any[],
  strategy?: string,
  boundariesElement?: any,
  onClosed?: (e?: any)=> void,
  fade?: boolean,
  transition?: any,
};

const defaultProps = {
  boundariesElement: 'scrollParent',
  placement: 'auto',
  hideArrow: false,
  isOpen: false,
  offset: [0, 0],
  flip: true,
  container: 'body',
  modifiers: [],
  onClosed: noop,
  fade: true,
  transition: {
      ...Fade.defaultProps,
  }
};

export const PopperContent = (props: PropTypes) => {
  const [isOpen, setIsOpen] = createSignal(props.isOpen)
  const ctx: any = {}

  createEffect(($isOpen: any) => {
    return props.isOpen && !$isOpen ? isOpen() : null
  })

  createEffect(($focus: any) => {
    const hasFocus = ctx.element && ctx.element.childNodes && ctx.element.childNodes[0] && ctx.element.childNodes[0].focus
    if (hasFocus) {
      ctx.element.childNodes[0].focus();
    }
    return hasFocus
  }, null)

  const setTargetNode = (node: any) => {
    ctx.targetNode = typeof node === 'string' ? getTarget(node) : node;
  }

  const getContainerNode = () => {
    return getTarget(props.container);
  }

  const getRef = (ref: any) => {
    ctx.element = ref;
  }

  const onClosed = () => {
    props.onClosed && props.onClosed();
    setIsOpen(false);
  }

  const renderChildren = () => {
    const [local, attributes] = splitProps(mergeProps(props, defaultProps),
    ["className", "tag", "isOpen", "flip", "target", "offset",
      "fallbackPlacements", "placementPrefix", "arrowClassName",
      "hideArrow", "popperClassName", "tag", "container", "modifiers",
      "strategy", "boundariesElement", "fade", "transition", "placement"]);
  

    const arrowClassName = () => classname(
      'arrow',
      local.arrowClassName
    )

    const popperClassName = () => classname(
      local.popperClassName,
      attributes.children,
      local.isOpen,
      local.flip,
      local.target,
      local.offset,
      local.fallbackPlacements,
      local.placementPrefix,
      local.arrowClassName,
      local.hideArrow,
      local.popperClassName,
      local.tag,
      local.container,
      local.modifiers,
      local.strategy,
      local.boundariesElement,
      local.fade,
      local.transition,
      local.placement,
      local.placementPrefix ? `${local.placementPrefix}-auto` : ''
    )

    const modifierNames = () => local.modifiers.map(m => m.name);
    const baseModifiers = () => [
      {
        name: 'offset',
        options: {
          offset: local.offset,
        },
      },
      {
        name: 'flip',
        enabled: local.flip,
        options: {
          fallbackPlacements: local.fallbackPlacements,
        },
      },
      {
        name: 'preventOverflow',
        options: {
          boundary: local.boundariesElement,
        },
      },
    ].filter(m => !modifierNames().includes(m.name));
    const extendedModifiers = [ ...baseModifiers(), ...local.modifiers];

    const popperTransition = () => ({
      ...Fade.defaultProps,
      ...local.transition,
      baseClass: local.fade ? local.transition.baseClass : '',
      timeout: local.fade ? local.transition.timeout : 0,
    })

    const renderChildren = ({update}: any) => typeof attributes.children === 'function' ? attributes.children({ update }) : attributes.children

    const arrow = (arrowProps: any) => !local.hideArrow && <span ref={arrowProps.ref} class={arrowClassName()} style={arrowProps.style} />

    return (
      <Fade
        {...popperTransition()}
        {...attributes}
        in={isOpen}
        onExited={onClosed}
        tag={local.tag}
      >
        <Popper
          referenceElement={ctx.targetNode}
          modifiers={extendedModifiers}
          placement={local.placement}
          strategy={local.strategy}
        >
          {({ ref, style, placement: popperPlacement, isReferenceHidden, arrowProps, update }: any) => (
            <div ref={ref} style={style} class={popperClassName()} data-popper-placement={popperPlacement} data-popper-reference-hidden={isReferenceHidden ? 'true' : undefined}>
              {renderChildren({update})}
              {arrow(arrowProps)}
            </div>
          )}
        </Popper>
      </Fade>
    );
  }

  
  setTargetNode(props.target);

  if (isOpen()) {
    return props.container === 'inline' ?
      renderChildren() :
      <WebPortal mount={getContainerNode()}><div ref={getRef}>{renderChildren()}</div></WebPortal>;
  }

  return null;
}