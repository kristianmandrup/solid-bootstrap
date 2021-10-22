import { Portal } from './Portal';
import { Fade, PropTypes as FadePropTypes } from './Fade';
import {
  getOriginalBodyPadding,
  conditionallyUpdateScrollbar,
  setScrollbarWidth,
  omit,
  focusableElements,
  TransitionTimeouts,
  keyCodes,
  getTarget,
  classname
} from './utils';
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';

function noop() { }

type PropTypes = {
  isOpen?: boolean,
  autoFocus?: boolean,
  centered?: boolean,
  fullscreen?: boolean | 'sm' | 'md' | 'lg' | 'xl'
  scrollable?: boolean,
  size?: string,
  toggle?: (e?: any) => void,
  keyboard?: boolean,
  role?: string,
  labelledBy?: string,
  backdrop?: boolean | 'static'
  onEnter?: (e?: any) => void,
  onExit?: (e?: any) => void,
  onOpened?: (e?: any) => void,
  onClosed?: (e?: any) => void,
  children?: any,
  className?: string,
  wrapClassName?: string,
  modalClassName?: string,
  backdropClassName?: string,
  contentClassName?: string,
  external?: any,
  fade?: boolean,
  zIndex?: number | string,
  backdropTransition?: FadePropTypes,
  modalTransition?: FadePropTypes,
  innerRef?: any,
  unmountOnClose?: boolean,
  returnFocusAfterClose?: boolean,
  container?: any,
  trapFocus?: boolean
};

const propsToOmit = [
  'isOpen',
  'autoFocus',
  'centered',
  'fullscreen',
  'scrollable',
  'size',
  'toggle',
  'keyboard',
  'role',
  'labelledBy',
  'backdrop',
  'onEnter',
  'onExit',
  'onOpened',
  'onClosed',
  'children',
  'className',
  'wrapClassName',
  'modalClassName',
  'backdropClassName',
  'contentClassName',
  'external',
  'fade',
  'zIndex',
  'backdropTransition',
  'modalTransition',
  'innerRef',
  'unmountOnClose',
  'returnFocusAfterClose',
  'container',
  'trapFocus' 
]

const defaultProps = {
  isOpen: false,
  autoFocus: true,
  centered: false,
  scrollable: false,
  role: 'dialog',
  backdrop: true,
  keyboard: true,
  zIndex: 1050,
  fade: true,
  onOpened: noop,
  onClosed: noop,
  modalTransition: {
    timeout: TransitionTimeouts.Modal,
  },
  backdropTransition: {
    mountOnEnter: true,
    timeout: TransitionTimeouts.Fade, // uses standard fade transition
  },
  unmountOnClose: true,
  returnFocusAfterClose: true,
  container: 'body',
  trapFocus: false
};

export const Modal = (props: PropTypes) => {
  const ctx: any = {}
  const [isOpen, setOpen] = createSignal(false)
  const [showStaticBackdropAnimation, setShowStaticBackdropAnimation] = createSignal(false)
  
  const clearBackdropAnimationTimeout = () => {
    if (ctx.backdropAnimationTimeout) {
      clearTimeout(ctx.backdropAnimationTimeout);
      ctx.backdropAnimationTimeout = undefined;
    }
  }
  
  onMount(() => {
    ctx.element = null;
    ctx.originalBodyPadding = null;  
  })

  onMount(() => {
    const { isOpen, autoFocus, onEnter } = props;

    if (isOpen) {
      init();
      setOpen(true)
      if (autoFocus) {
        setFocus();
      }
    }

    if (onEnter) {
      onEnter();
    }

    // traps focus inside the Modal, even if the browser address bar is focused
    document.addEventListener('focus', trapFocus, true);

    ctx.isMounted = true;
  })

  createEffect((prevProps: any) => {
    if (props.isOpen && !isOpen()) {
      init();
      setOpen(true);
      // let render() renders Modal Dialog first
      return;
    }

    // now Modal Dialog is rendered and we can refer ctx.element and ctx.dialog
    if (props.autoFocus && isOpen() && !isOpen()) {
      setFocus();
    }

    if (ctx.element && prevProps.zIndex !== props.zIndex) {
      ctx.element.style.zIndex = props.zIndex;
    }
    return {zIndex: props.zIndex, isOpen}
  }, {} as any)

  onCleanup(() => {
    clearBackdropAnimationTimeout();

    if (props.onExit) {
      props.onExit();
    }

    if (ctx.element) {
      destroy();
      if (props.isOpen || isOpen()) {
        close();
      }
    }

    document.removeEventListener('focus', trapFocus, true);
    ctx.isMounted = false;
  })

  const trapFocus = (ev?:any) => {
    if (!props.trapFocus) {
      return;
    }

    if (!ctx.element) //element is not attached
      return;

    if (ctx.dialog && ctx.dialog.parentNode === ev.target) // initial focus when the Modal is opened
      return;

    if (ctx.modalIndex < (Modal.openCount - 1)) // last opened modal
      return;

    const children = getFocusableChildren();

    for (let i = 0; i < children.length; i++) { // focus is already inside the Modal
      if (children[i] === ev.target)
        return;
    }

    if (children.length > 0) { // otherwise focus the first focusable element in the Modal
      ev.preventDefault();
      ev.stopPropagation();
      children[0].focus();
    }
  }

  const onOpened = (node: any, isAppearing: any) => {
    props.onOpened && props.onOpened();
    ((props.modalTransition as any).onEntered || noop)(node, isAppearing);
  }

  const onClosed = (node: any) => {
    const { unmountOnClose } = props;
    // so all methods get called before it is unmounted
    props.onClosed && props.onClosed();
    ((props.modalTransition as any).onExited || noop)(node);

    if (unmountOnClose) {
      destroy();
    }
    close();

    if (ctx.isMounted) {
      setOpen(false);
    }
  }

  const setFocus = () => {
    if (ctx.dialog && ctx.dialog.parentNode && typeof ctx.dialog.parentNode.focus === 'function') {
      ctx.dialog.parentNode.focus();
    }
  }

  const getFocusableChildren = () => {
    return ctx.element.querySelectorAll(focusableElements.join(', '));
  }

  const getFocusedChild = () => {
    let currentFocus;
    const focusableChildren = getFocusableChildren();

    try {
      currentFocus = document.activeElement;
    } catch (err) {
      currentFocus = focusableChildren[0];
    }
    return currentFocus;
  }

  // not mouseUp because scrollbar fires it, shouldn't close when user scrolls
  const handleBackdropClick = (e: any) => {
    if (e.target === ctx.mouseDownElement) {
      e.stopPropagation();

      const backdrop = ctx.dialog ? ctx.dialog.parentNode : null;

      if (backdrop && e.target === backdrop && props.backdrop === 'static') {
        handleStaticBackdropAnimation();
      }

      if (!props.isOpen || props.backdrop !== true) return;

      if (backdrop && e.target === backdrop && props.toggle) {
        props.toggle(e);
      }
    }
  }

  const handleTab = (e: any) => {
    if (e.which !== 9) return;
    if (ctx.modalIndex < (Modal.openCount - 1)) return; // last opened modal

    const focusableChildren = getFocusableChildren();
    const totalFocusable = focusableChildren.length;
    if (totalFocusable === 0) return;
    const currentFocus = getFocusedChild();

    let focusedIndex = 0;

    for (let i = 0; i < totalFocusable; i += 1) {
      if (focusableChildren[i] === currentFocus) {
        focusedIndex = i;
        break;
      }
    }

    if (e.shiftKey && focusedIndex === 0) {
      e.preventDefault();
      focusableChildren[totalFocusable - 1].focus();
    } else if (!e.shiftKey && focusedIndex === totalFocusable - 1) {
      e.preventDefault();
      focusableChildren[0].focus();
    }
  }

  const handleBackdropMouseDown = (e: any) => {
    ctx.mouseDownElement = e.target;
  }

  const handleEscape = (e: any) => {
    if (props.isOpen && e.keyCode === keyCodes.esc && props.toggle) {
      if (props.keyboard) {
        e.preventDefault();
        e.stopPropagation();

        props.toggle(e);
      }
      else if (props.backdrop === 'static') {
        e.preventDefault();
        e.stopPropagation();

        handleStaticBackdropAnimation();
      }
    }
  }

  const handleStaticBackdropAnimation = () => {
    clearBackdropAnimationTimeout();
    setShowStaticBackdropAnimation(true);
    ctx.backdropAnimationTimeout = setTimeout(() => {
      setShowStaticBackdropAnimation(false);
    }, 100);
  }

  const init = () => {
    try {
      ctx.triggeringElement = document.activeElement;
    } catch (err) {
      ctx.triggeringElement = null;
    }

    if (!ctx.element) {
      ctx.element = document.createElement('div');
      ctx.element.setAttribute('tabindex', '-1');
      ctx.element.style.position = 'relative';
      ctx.element.style.zIndex = props.zIndex;
      ctx.mountContainer = getTarget(props.container);
      ctx.mountContainer.appendChild(ctx.element);
    }

    ctx.originalBodyPadding = getOriginalBodyPadding();
    conditionallyUpdateScrollbar();

    if (Modal.openCount === 0) {
      document.body.className = [
        document.body.className,
        'modal-open'
      ].join(' ');
    }
    ctx.modalIndex = Modal.openCount;
    Modal.openCount += 1;
  }

  const destroy = () => {
    if (ctx.element) {
      ctx.mountContainer.removeChild(ctx.element);
      ctx.element = null;
    }

    manageFocusAfterClose();
  }

  const manageFocusAfterClose = () => {
    if (ctx.triggeringElement) {
      const { returnFocusAfterClose } = props;
      if (ctx.triggeringElement.focus && returnFocusAfterClose) ctx.triggeringElement.focus();
      ctx.triggeringElement = null;
    }
  }

  const close = () => {
    if (Modal.openCount <= 1) {
      const modalOpenClassName = ['modal-open']
      // Use regex to prevent matching `modal-open` as part of a different class, e.g. `my-modal-opened`
      const modalOpenClassNameRegex = new RegExp(`(^| )${modalOpenClassName}( |$)`);
      document.body.className = document.body.className.replace(modalOpenClassNameRegex, ' ').trim();
    }
    manageFocusAfterClose();
    Modal.openCount = Math.max(0, Modal.openCount - 1);

    setScrollbarWidth(ctx.originalBodyPadding);
  }

  const renderModalDialog = () => {
    const attributes = omit(props, propsToOmit);
    const dialogBaseClass = 'modal-dialog';

    const innerClass = classname(['modal-content', props.contentClassName])

    return (
      <div
        {...attributes}
        className={[dialogBaseClass, props.className, {
          [`modal-${props.size}`]: props.size,
          [`${dialogBaseClass}-centered`]: props.centered,
          [`${dialogBaseClass}-scrollable`]: props.scrollable,
          'modal-fullscreen': props.fullscreen === true,
          [`modal-fullscreen-${props.fullscreen}-down`]: (typeof props.fullscreen) === 'string',
        }]}
        role="document"
        ref={(c) => {
          ctx.dialog = c;
        }}
      >
        <div
          class={innerClass}
        >
          {props.children}
        </div>
      </div>
    );
  }

  const {
    unmountOnClose
  } = {
    ...defaultProps,
    ...props
  } as any;

  const $open = isOpen()
  if (!!ctx.element && ($open || !unmountOnClose)) {
    const isModalHidden = !!ctx.element && !$open && !unmountOnClose;
    ctx.element.style.display = isModalHidden ? 'none' : 'block';

    const {
      wrapClassName,
      modalClassName,
      backdropClassName,
      isOpen,
      backdrop,
      role,
      labelledBy,
      external,
      innerRef,
    } = {
      ...defaultProps,
      ...props
    } as any;

    const modalAttributes = {
      onClick: handleBackdropClick,
      onMouseDown: handleBackdropMouseDown,
      onKeyUp: handleEscape,
      onKeyDown: handleTab,
      style: { display: 'block' },
      'aria-labelledby': labelledBy,
      role,
      tabIndex: '-1'
    };

    const hasTransition = props.fade;
    const modalTransition = {
      ...Fade.defaultProps,
      ...props.modalTransition,
      baseClass: hasTransition ? props?.modalTransition?.baseClass : '',
      timeout: hasTransition ? props?.modalTransition?.timeout : 0,
    };
    const backdropTransition = {
      ...Fade.defaultProps,
      ...props.backdropTransition,
      baseClass: hasTransition ? props?.backdropTransition?.baseClass : '',
      timeout: hasTransition ? props?.backdropTransition?.timeout : 0,
    };

    const Backdrop = backdrop && (
      hasTransition ?
        (<Fade
          {...backdropTransition}
          in={isOpen && !!backdrop}
          className={['modal-backdrop', backdropClassName].join(' ')}
        />)
        : <div class={['modal-backdrop', 'show', backdropClassName].join(' ')} />
    );

    // onEntered={onOpened}
    // onExited={onClosed}              

    return (
      <Portal node={ctx.element}>
        <div className={wrapClassName}>
          <Fade
            {...modalAttributes}
            {...modalTransition}
            in={isOpen}
            className={['modal', modalClassName, showStaticBackdropAnimation() ? 'modal-static' : ''].join(' ')}
            innerRef={innerRef}
          >
            {external}
            {renderModalDialog()}
          </Fade>
          {Backdrop}
        </div>
      </Portal>
    );
  }
  return null;
}

Modal.openCount = 0;