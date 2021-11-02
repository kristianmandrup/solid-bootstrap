import { createSignal } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { Transition } from 'solid-transition-group';
import { omit, pick, TransitionTimeouts, TransitionPropTypeKeys, TransitionStatuses, classname } from './utils';

type TransitionPropTypes = {
  onEntering?: (node: any, isAppearing: boolean) => void
  onEntered?: (node: any, isAppearing: boolean) => void
  onExit?: (node: any) => void
  onExiting?: (node: any) => void
  onExited?: (node: any) => void
}

interface PropTypes extends TransitionPropTypes {
  horizontal?: boolean,
  isOpen?: boolean,
  children?: any,
  tag?: any,
  className?: any,
  navbar?: boolean,
  innerRef?: any,
};

const defaultProps = {
  // ...Transition.defaultProps,
  horizontal: false,
  isOpen: false,
  appear: false,
  enter: true,
  exit: true,
  tag: 'div',
  timeout: TransitionTimeouts.Collapse,
};

const transitionStatusToClassHash = {
  [TransitionStatuses.ENTERING]: 'collapsing',
  [TransitionStatuses.ENTERED]: 'collapse show',
  [TransitionStatuses.EXITING]: 'collapsing',
  [TransitionStatuses.EXITED]: 'collapse',
};

function getTransitionClass(status: string) {
  return transitionStatusToClassHash[status] || 'collapse';
}

export const Collapse = (props: PropTypes) => {
  const [dimension, setDimension ] = createSignal()
  const [getStatus, setStatus] = createSignal('')


  const getDimension = (node: any) => {
    return props.horizontal ? node.scrollWidth : node.scrollHeight;
  }

  const onEntering = (node: any, isAppearing: boolean) => {
    setDimension(getDimension(node));
    setStatus(TransitionStatuses.ENTERING)
    props.onEntering && props.onEntering(node, isAppearing);
  }

  const onEntered = (node: any, isAppearing: boolean) => {
    setDimension(null);
    setStatus(TransitionStatuses.ENTERED)
    props.onEntered && props.onEntered(node, isAppearing);
  }

  const onExit = (node: any) => {    
    setDimension(getDimension(node));
    props.onExit && props.onExit(node);
  }

  const onExiting = (node: any) => {
    setStatus(TransitionStatuses.EXITING)
    // getting this variable triggers a reflow
    const _unused = getDimension(node); // eslint-disable-line no-unused-vars
    setDimension(0);
    props.onExiting && props.onExiting(node);
  }

  const onExited = (node: any) => {
    setStatus(TransitionStatuses.EXITED)
    setDimension(null);
    props.onExited && props.onExited(node);
  }

    let {
      tag,
      horizontal,
      isOpen,
      className,
      navbar,
      innerRef,
      ...otherProps
    } = {
      ...defaultProps,
      ...props
    } as any;

    const onTransition = () => {
      let collapseClass = getTransitionClass(getStatus());
      const classes = classname(
        className,
        horizontal && 'collapse-horizontal',
        collapseClass,
        navbar && 'navbar-collapse'
      )          
      // TODO: convert to string
      const dimStyle = dimension === null ? null : { [horizontal ? 'width' : 'height']: dimension };
      const style = { ...childProps.style, ...dimStyle }
      return (
        <Dynamic component={tag}
          {...childProps}
          style={style}
          class={classes}
          ref={props.innerRef}
        >
          {props.children}
        </Dynamic>
      );
    }

    const transitionProps = pick(otherProps, TransitionPropTypeKeys);
    const childProps = omit(otherProps, TransitionPropTypeKeys);
    return (
      <Transition
        {...transitionProps}
        in={isOpen}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
      >
        {onTransition()}
      </Transition>
    );
  }
