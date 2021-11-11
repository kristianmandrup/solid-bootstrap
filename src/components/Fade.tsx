import { createSignal, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { Transition } from 'solid-transition-group';
import { classname, doneFn, TransitionPropTypes, TransitionTimeouts } from './utils';

export interface PropTypes extends TransitionPropTypes {
  children?: any,
  tag?: any,
  baseClass?: string,
  baseClassActive?: string,
  className?: string,
  ref?: any
  timeout?: any,
  appear?: boolean,
  enter?: boolean,
  exit?: boolean,
  in?: boolean,
  onClick?: (e?: any) => void
  onMouseDown?: (e?: any) => void,
};

const defaultProps = {
  // ...Transition.defaultProps,
  tag: 'div',
  baseClass: 'fade',
  baseClassActive: 'show',
  timeout: TransitionTimeouts.Fade,
  appear: true,
  enter: true,
  exit: true,
  in: true,
};

export const Fade = (props: PropTypes) => {
  const [local, transitionProps, attributes] = splitProps(mergeProps(props, defaultProps),
  ["className", "tag", "baseClass", "baseClassActive", "onClick", "children"],
  ["onEnter", "onEntering", "onEntered",  "onExit", "onExiting", "onExited"]
  )

  const onEntered = (node: any) => {
    setStatus('entered')  
    transitionProps.onEntered && transitionProps.onEntered(node)
  }

  const onExited = (node: any) => {
    setStatus('')  
    transitionProps.onExited && transitionProps.onExited(node)
  }

  const [status, setStatus] = createSignal('')

  const transitionBody = () => {
    const isActive = status() === 'entered';
    const classes = classname(
      local.className,
      local.baseClass,
      isActive && local.baseClassActive
    )
    return (
      <Dynamic component={local.tag} class={classes} {...attributes} ref={props.ref}>
        {props.children}
      </Dynamic>
    );
  }

  return (
    <Transition {...transitionProps} onBeforeExit={transitionProps.onExiting} onBeforeEnter={transitionProps.onEntering} onAfterEnter={onEntered} onAfterExit={onExited}>
      {transitionBody()}
    </Transition>
  );
}

Fade.defaultProps = defaultProps