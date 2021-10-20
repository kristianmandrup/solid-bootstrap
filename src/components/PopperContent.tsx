import usePopper from 'solid-popper';
import { getTarget,DOMElement } from './utils';
import { Fade } from './Fade';
import { createEffect, createSignal } from 'solid-js';

function noop() {  }

type PropTypes = {
  children: any,
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

  const getTargetNode = () => {
    return ctx.targetNode;
  }

  const getContainerNode = () => {
    return getTarget(props.container);
  }

  const getRef = (ref: any) => {
    ctx.element = ref;
  }

  const onClosed =  () => {
    props.onClosed && props.onClosed();
    setIsOpen(false);
  }

  const renderChildren = () => {
    const {
      children,
      isOpen,
      flip,
      target,
      offset,
      fallbackPlacements,
      placementPrefix,
      arrowClassName: _arrowClassName,
      hideArrow,
      popperClassName: _popperClassName,
      tag,
      container,
      modifiers,
      strategy,
      boundariesElement,
      onClosed,
      fade,
      transition,
      placement,
      ...attrs
    } = {
      ...defaultProps,
      ...props
    }
    const arrowClassName: string = [
      'arrow',
      _arrowClassName
    ].join(' ')
    const popperClassName: string = [
      _popperClassName,
      placementPrefix ? `${placementPrefix}-auto` : ''
    ].join(' ')

    const modifierNames = modifiers.map(m => m.name);
    const baseModifiers = [
      {
        name: 'offset',
        options: {
          offset,
        },
      },
      {
        name: 'flip',
        enabled: flip,
        options: {
          fallbackPlacements,
        },
      },
      {
        name: 'preventOverflow',
        options: {
          boundary: boundariesElement,
        },
      },
    ].filter(m => !modifierNames.includes(m.name));
    const extendedModifiers = [ ...baseModifiers, ...modifiers];

    const popperTransition = {
      ...Fade.defaultProps,
      ...transition,
      baseClass: fade ? transition.baseClass : '',
      timeout: fade ? transition.timeout : 0,
    }

    const Popper = (props: any) => <>popper</>

    return (
      <Fade
        {...popperTransition}
        {...attrs}
        in={isOpen}
        onExited={onClosed}
        tag={tag}
      >
        <Popper
          referenceElement={ctx.targetNode}
          modifiers={extendedModifiers}
          placement={placement}
          strategy={strategy}
        >
          {({ ref, style, placement: popperPlacement, isReferenceHidden, arrowProps, update }: any) => (
            <div ref={ref} style={style} class={popperClassName} data-popper-placement={popperPlacement} data-popper-reference-hidden={isReferenceHidden ? 'true' : undefined}>
              {typeof children === 'function' ? children({ update }) : children}
              {!hideArrow && <span ref={arrowProps.ref} class={arrowClassName} style={arrowProps.style} />}
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
        <>portal</>
        // createPortal((<div ref={this.getRef}>{this.renderChildren()}</div>), this.getContainerNode());
    }

    return null;
  }