import { createEffect, createSignal, mergeProps, onCleanup, onMount, splitProps } from 'solid-js';
import { PopperContent } from './PopperContent';
import {
  getTarget,
  omit,
  classname
} from './utils';

export type PropTypes = {
  children?: any
  placement?: any
  isOpen?: boolean
  target: any
  toggle?: () => void  
  container?: any,
  disabled?: boolean,
  hideArrow?: boolean,
  boundariesElement?: any,
  className?: string,
  innerClassName?: string,
  arrowClassName?: string,
  popperClassName?: string,
  autohide?: boolean,
  placementPrefix?: string,
  delay?: any,
  modifiers?: any[],
  strategy?: string,
  offset?: number[],
  innerRef?: any,
  trigger?: string,
  fade?: boolean,
  flip?: boolean,  
}

const propKeys = [
  'children',
  'placement',
  'isOpen',
  'target',
  'toggle',
  'container',
  'disabled',
  'hideArrow',
  'boundariesElement',
  'className',
  'innerClassName',
  'arrowClassName',
  'popperClassName',
  'autohide',
  'placementPrefix',
  'delay',
  'modifiers',
  'strategy',
  'offset',
  'innerRef',
  'trigger',
  'fade',
  'flip'
]

const DEFAULT_DELAYS: any = {
  show: 0,
  hide: 50
};

const defaultProps = {
  isOpen: false,
  hideArrow: false,
  autohide: false,
  delay: DEFAULT_DELAYS,
  toggle: function () {},
  trigger: 'click',
  fade: true,
};

function isInDOMSubtree(element: any, subtreeRoot: any) {
  return subtreeRoot && (element === subtreeRoot || subtreeRoot.contains(element));
}

function isInDOMSubtrees(element: any, subtreeRoots = []) {
  return subtreeRoots && subtreeRoots.length && subtreeRoots.filter(subTreeRoot=> isInDOMSubtree(element, subTreeRoot))[0];
}

export const TooltipPopoverWrapper = (props: any) => {
  let ctx: any = {
    // is this even needed??
    isMounted: false,
    _targets: []
  }

  onMount(() => {
    ctx.isMounted = true
  })

  onCleanup(() => {
    ctx.isMounted = false
    removeTargetEvents();
    clearShowTimeout();
    clearHideTimeout();
  })

  createEffect((state: any = {}) => {
    if (local.isOpen) {
      updateTarget();    
    }    
     if (open() && !state.isOpen) {
       setOpen()
     }
     return {isOpen: open()}
  })

  const onMouseOverTooltipContent = () => {
    if (local.trigger.indexOf('hover') > -1 && !local.autohide) {
      if (ctx._hideTimeout) {
        clearHideTimeout();
      }
      if (open() && !local.isOpen) {
        toggle();
      }
    }
  }

  const onMouseLeaveTooltipContent = (e?: any) => {
    if (local.trigger.indexOf('hover') > -1 && !local.autohide) {
      if (ctx._showTimeout) {
        clearShowTimeout();
      }
      e.persist();
      ctx._hideTimeout = setTimeout(
        hide.bind(this, e),
        getDelay('hide')
      );
    }
  }

  const onEscKeyDown = (e?: any) => {
    if (e.key === 'Escape') {
      hide(e);
    }
  }

  const getRef = (ref: any) => {
    const { innerRef } = props;
    if (innerRef) {
      if (typeof innerRef === 'function') {
        innerRef(ref);
      } else if (typeof innerRef === 'object') {
        innerRef.current = ref;
      }
    }
    ctx._popover = ref;
  }

  const getDelay = (key: string) => {
    const { delay } = props;
    if (typeof delay === 'object') {
      return isNaN(delay[key]) ? DEFAULT_DELAYS[key] : delay[key];
    }
    return delay;
  }

  const getCurrentTarget = (target: any): any => {
    if (!target)
      return null;
    const index = ctx._targets.indexOf(target);
    if (index >= 0)
      return ctx._targets[index];
    return getCurrentTarget(target.parentElement);
  }

  const show = (e?: any) => {
    if (!local.isOpen) {
      clearShowTimeout();
      ctx.currentTargetElement = e ? e.currentTarget || getCurrentTarget(e.target) : null;
      if (e && e.composedPath && typeof e.composedPath === 'function') {
        const path = e.composedPath();
        ctx.currentTargetElement = (path && path[0]) || ctx.currentTargetElement;
      }
      toggle(e);
    }
  }

  const showWithDelay = (e?: any) => {
    if (ctx._hideTimeout) {
      clearHideTimeout();
    }
    ctx._showTimeout = setTimeout(
      show.bind(this, e),
      getDelay('show')
    );
  }
  
  const hide = (e?: any) => {
    if (local.isOpen) {
      clearHideTimeout();
      ctx.currentTargetElement = null;
      toggle(e);
    }
  }

  const hideWithDelay = (e?: any) => {
    if (ctx._showTimeout) {
      clearShowTimeout();
    }
    ctx._hideTimeout = setTimeout(
      hide.bind(this, e),
      getDelay('hide')
    );
  }


  const clearShowTimeout = () => {
    clearTimeout(ctx._showTimeout);
    ctx._showTimeout = undefined;
  }

  const clearHideTimeout = () => {
    clearTimeout(ctx._hideTimeout);
    ctx._hideTimeout = undefined;
  }

  const handleDocumentClick = (e?:any) => {
    const triggers = local.trigger.split(' ');

    if (triggers.indexOf('legacy') > -1 && (local.isOpen || isInDOMSubtrees(e.target, ctx._targets))) {
      if (ctx._hideTimeout) {
        clearHideTimeout();
      }
      if (local.isOpen && !isInDOMSubtree(e.target, ctx._popover)) {
        hideWithDelay(e);
      } else if (!local.isOpen) {
        showWithDelay(e);
      }
    } else if (triggers.indexOf('click') > -1 && isInDOMSubtrees(e.target, ctx._targets)) {
      if (ctx._hideTimeout) {
        clearHideTimeout();
      }

      if (!local.isOpen) {
        showWithDelay(e);
      } else {
        hideWithDelay(e);
      }
    }
  }

  const addEventOnTargets = (type: string, handler: any, isBubble?: boolean) => {
    ctx._targets.forEach((target: any) => {
      target.addEventListener(type, handler, isBubble);
    });
  }

  const removeEventOnTargets = (type: string, handler: any, isBubble?: boolean) => {
    ctx._targets.forEach((target: any) => {
      target.removeEventListener(type, handler, isBubble);
    });
  }

  const addTargetEvents = () => {
    if (local.trigger) {
      let triggers = local.trigger.split(' ');
      if (triggers.indexOf('manual') === -1) {
        if (triggers.indexOf('click') > -1 || triggers.indexOf('legacy') > -1) {
          document.addEventListener('click', handleDocumentClick, true);
        }

        if (ctx._targets && ctx._targets.length) {
          if (triggers.indexOf('hover') > -1) {
            addEventOnTargets(
              'mouseover',
              showWithDelay,
              true
            );
            addEventOnTargets(
              'mouseout',
              hideWithDelay,
              true
            );
          }
          if (triggers.indexOf('focus') > -1) {
            addEventOnTargets('focusin', show, true);
            addEventOnTargets('focusout', hide, true);
          }
          addEventOnTargets('keydown', onEscKeyDown, true);
        }
      }
    }
  }

  const removeTargetEvents = () => {
    if (ctx._targets) {
      removeEventOnTargets(
        'mouseover',
        showWithDelay,
        true
      );
      removeEventOnTargets(
        'mouseout',
        hideWithDelay,
        true
      );
      removeEventOnTargets('keydown', onEscKeyDown, true);
      removeEventOnTargets('focusin', show, true);
      removeEventOnTargets('focusout', hide, true);
    }

    document.removeEventListener('click', handleDocumentClick, true)
  }

  const updateTarget = () => {
    const newTarget = getTarget(local.target, true);
    if (newTarget !== ctx._targets) {
      removeTargetEvents();
      ctx._targets = newTarget ? Array.from(newTarget) : [];
      ctx.currentTargetElement = ctx.currentTargetElement || ctx._targets[0];
      addTargetEvents();
    }
  }

  const toggle = (e?: any) => {
    if (local.disabled || !ctx._isMounted) {
      return e && e.preventDefault();
    }

    return local.toggle(e);
  }  


  const [local, attributes]: any = splitProps(mergeProps(defaultProps, props),
  ["className", "innerClassName", "isOpen", "hideArrow",
    "boundariesElement", "placement", "placementPrefix",
    "arrowClassName", "popperClassName", "container", "modifiers",
    "strategy", "offset", "fade", "flip", "children"]);

  const [open, setOpen ] = createSignal(local.isOpen);  

  const popperClasses = () => local.popperClassName

  const classes = () => local.innerClassName;

  const target = ctx.currentTargetElement || ctx._targets[0];
  if (!target) {
    return null;
  }  

  const renderChildren = (update: any) => typeof local.children === 'function' ? local.children({ update }) : local.children

  return (
    <PopperContent
      className={local.className}
      target={target}
      isOpen={local.isOpen}
      hideArrow={local.hideArrow}
      boundariesElement={local.boundariesElement}
      placement={local.placement}
      placementPrefix={local.placementPrefix}
      arrowClassName={local.arrowClassName}
      popperClassName={popperClasses()}
      container={local.container}
      modifiers={local.modifiers}
      strategy={local.strategy}
      offset={local.offset}
      fade={local.fade}
      flip={local.flip}
    >
      {({ update }: any) => (
        <div
          {...attributes}
          ref={getRef}
          className={classes()}
          role="tooltip"
          onMouseOver={onMouseOverTooltipContent}
          onMouseLeave={onMouseLeaveTooltipContent}
          onKeyDown={onEscKeyDown}
        >
          {renderChildren(update)}
        </div>
      )}

    </PopperContent>
  );  
}