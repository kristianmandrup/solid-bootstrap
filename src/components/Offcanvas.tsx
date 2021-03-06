import {Portal} from './Portal';
import {Fade, PropTypes as FadePropTypes } from './Fade';
import {
  TransitionTimeouts,
  conditionallyUpdateScrollbar,
  focusableElements,
  getOriginalBodyPadding,
  getTarget,
  keyCodes,
  setScrollbarWidth,
  classname
} from './utils';
import { createEffect, createSignal, mergeProps, onCleanup, onMount, splitProps } from 'solid-js';

function noop() { }

type PropTypes = {
  autoFocus?: boolean,
  backdrop?: boolean,
  backdropClassName?: string,
  backdropTransition?: FadePropTypes,
  children?: any,
  className?: string,
  tag?: string,
  style?: string,
  container?: any,  
  direction?: 'start' | 'end' | 'bottom' | 'top' | 'left' | 'right'
  fade?: boolean,
  ref?: any
  isOpen?: boolean,
  keyboard?: boolean,
  labelledBy?: string,
  offcanvasTransition?: FadePropTypes,
  onClosed?: () => void,
  onEnter?: () => void,
  onExit?: () => void,
  onOpened?: () => void,
  returnFocusAfterClose?: boolean,
  role?: string,
  scrollable?: boolean,
  toggle?: (e?: any) => void,
  trapFocus?: boolean,
  unmountOnClose?: boolean,
  zIndex?: number | string
};

const defaultProps = {
  isOpen: false,
  autoFocus: true,
  direction: 'start',
  scrollable: false,
  role: 'dialog',
  backdrop: true,
  keyboard: true,
  zIndex: 1050,
  fade: true,
  onOpened: noop,
  onClosed: noop,
  offcanvasTransition: {
    timeout: TransitionTimeouts.Offcanvas,
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

export const Offcanvas = (props: PropTypes) => {
  const [isOpen, setIsOpen] = createSignal(false)
  const [isMounted, setIsMounted] = createSignal(false)
  
  let ctx: any = {}

  onMount(() => {
    const { isOpen, autoFocus, onEnter } = props;

    if (isOpen) {
      init();
      setIsOpen(true)
      if (autoFocus) {
        setFocus();
      }
    }

    if (onEnter) {
      onEnter();
    }

    // traps focus inside the Offcanvas, even if the browser address bar is focused
    document.addEventListener('focus', trapFocus, true);

    setIsMounted(true);
  })

  createEffect((prev: any) => {
    if (props.isOpen && !prev.isOpen) {
      init();
      setIsOpen(true);

      return;
    }

    // now Offcanvas Dialog is rendered and we can refer _element and _dialog
    if (props.autoFocus && isOpen && !prev.isOpen) {
      setFocus();
    }

    if (ctx.element && prev.zIndex !== props.zIndex) {
      ctx.element.style.zIndex = props.zIndex;
    }
    return { isOpen, zIndex: props.zIndex }
  })

  onCleanup(() => {
    clearBackdropAnimationTimeout();

    if (props.onExit) {
      props.onExit();
    }

    if (ctx.element) {
      destroy();
      if (props.isOpen || isOpen) {
        close();
      }
    }

    document.removeEventListener('focus', trapFocus, true);
    setIsMounted(false);
  })

  const trapFocus = (ev?: any) => {
    if (!props.trapFocus) {
      return;
    }

    if (!ctx.element) //element is not attached
      return;

    if (ctx.dialog === ev.target) // initial focus when the Offcanvas is opened
      return;

    if (ctx.offcanvasIndex < (Offcanvas.openCount - 1)) // last opened offcanvas
      return;

    const children = getFocusableChildren();

    for (let i = 0; i < children.length; i++) { // focus is already inside the Offcanvas
      if (children[i] === ev.target)
        return;
    }

    if (children.length > 0) { // otherwise focus the first focusable element in the Offcanvas
      ev.preventDefault();
      ev.stopPropagation();
      children[0].focus();
    }
  }

  const onOpened = (node: any, isAppearing: boolean) => {
    props.onOpened && props.onOpened();
    ((props?.offcanvasTransition as any).onEntered || noop)(node, isAppearing);
  }

  const onClosed = (node: any) => {
    const { unmountOnClose } = props;
    // so all methods get called before it is unmounted
    props.onClosed && props.onClosed();
    ((props?.offcanvasTransition as any).onExited || noop)(node);

    if (unmountOnClose) {
      destroy();
    }
    close();

    if (isMounted()) {
      setIsOpen(false);
    }
  }

  const setFocus = () => {
    if (ctx.dialog && typeof ctx.dialog.focus === 'function') {
      ctx.dialog.focus();
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

      if (!props.isOpen || props.backdrop !== true) return;

      if (ctx.backdrop && e.target === ctx.backdrop && props.toggle) {
        props.toggle(e);
      }
    }
  }

  const handleTab = (e: any) => {
    if (e.which !== 9) return;
    if (ctx.offcanvasIndex < (Offcanvas.openCount - 1)) return; // last opened offcanvas

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

  const clearBackdropAnimationTimeout = () => {
    if (ctx.backdropAnimationTimeout) {
      clearTimeout(ctx.backdropAnimationTimeout);
      ctx.backdropAnimationTimeout = undefined;
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
    }
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

    if (Offcanvas.openCount === 0 && (props.backdrop && !props.scrollable)) {
      document.body.style.overflow = 'hidden'; 
    }

    ctx.offcanvasIndex = Offcanvas.openCount;
    Offcanvas.openCount += 1;
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
    manageFocusAfterClose();
    Offcanvas.openCount = Math.max(0, Offcanvas.openCount - 1);

    document.body.style.overflow = ''; 
    setScrollbarWidth(ctx.originalBodyPadding);
  }

  const {
    direction,
    unmountOnClose
  } = props;

  if (!!ctx.element && (isOpen || !unmountOnClose)) {
    const isOffcanvasHidden = !!ctx.element && !isOpen && !unmountOnClose;
    ctx.element.style.display = isOffcanvasHidden ? 'none' : 'block';


    const [local, attributes]: any = splitProps(mergeProps(defaultProps, props),
    ["className", "tag", "backdropClassName", "backdrop",
      "role", "labelledBy", "style"]);
  
    const offcanvasAttributes = {
      onKeyUp: handleEscape,
      onKeyDown: handleTab,
      'aria-labelledby': local.labelledBy,
      role: local.role,
      tabIndex: '-1'
    };

    const hasTransition = props.fade;
    const offcanvasTransition = {
      ...Fade.defaultProps,
      ...local.offcanvasTransition,
      baseClass: hasTransition ? props.offcanvasTransition?.baseClass : '',
      timeout: hasTransition ? (local.soffcanvasTransition as any).timeout : 0,
    };
    const backdropTransition = {
      ...Fade.defaultProps,
      ...props.backdropTransition,
      baseClass: hasTransition ? props.backdropTransition?.baseClass : '',
      timeout: hasTransition ? (props.backdropTransition as any).timeout : 0,
    };

    const BackDropFade = () => {
      const classes = classname('offcanvas-backdrop', local.backdropClassName)
      return (<Fade
      {...backdropTransition}
      in={props.isOpen && !!local.backdrop}
      ref={(c: any) => {
        ctx.backdrop = c;
      }}
      className={classes}
      onClick={handleBackdropClick}
      onMouseDown={handleBackdropMouseDown}
    />)
    }

    const BackDropShow = () => {
      const classes = classname('offcanvas-backdrop', 'show', local.backdropClassName)
      return <div
        class={classes}
        onClick={handleBackdropClick}
        onMouseDown={handleBackdropMouseDown}
      />
    }

    const Backdrop = () => local.backdrop && (
      hasTransition ?
      BackDropFade() : BackDropShow() 
    );

    const classes = () => classname(
      'offcanvas', local.className,
      `offcanvas-${local.direction}`
    )

    // styleToString
    const styles = {
      ...local.style,
      visibility: props.isOpen ? 'visible' : 'hidden'
    }

    return (
      <Portal node={ctx.element}>
        <Fade
          {...attributes}
          {...offcanvasAttributes}
          {...offcanvasTransition}
          in={props.isOpen}
          onEntered={onOpened}
          onExited={onClosed}
          class={classes()}
          ref={(c: any) => {
            ctx.dialog = c;
          }}
          style={styles}
        />
        {Backdrop()}
      </Portal>
    );
  }
  return null;
}

Offcanvas.openCount = 0;