import { createSignal } from 'solid-js';
import { Transition } from 'solid-transition-group';
import { omit, pick, TransitionTimeouts, TransitionPropTypeKeys, TransitionStatuses } from './utils';

type TransitionPropTypes = {
  onEntering: (node: any, isAppearing: boolean) => void
  onEntered: (node: any, isAppearing: boolean) => void
  onExit: (node: any) => void
  onExiting: (node: any) => void
  onExited: (node: any) => void
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


  const getDimension = (node: any) => {
    return props.horizontal ? node.scrollWidth : node.scrollHeight;
  }

  const onEntering = (node: any, isAppearing: boolean) => {
    setDimension(getDimension(node));
    props.onEntering(node, isAppearing);
  }

  const onEntered = (node: any, isAppearing: boolean) => {
    setDimension(null);
    props.onEntered(node, isAppearing);
  }

  const onExit = (node: any) => {
    setDimension(getDimension(node));
    props.onExit(node);
  }

  const onExiting = (node: any) => {
    // getting this variable triggers a reflow
    const _unused = getDimension(node); // eslint-disable-line no-unused-vars
    setDimension(0);
    props.onExiting(node);
  }

  const onExited = (node: any) => {
    setDimension(null);
    props.onExited(node);
  }

    const {
      tag: Tag,
      horizontal,
      isOpen,
      className,
      navbar,
      children,
      innerRef,
      ...otherProps
    } = {
      ...defaultProps,
      ...props
    } as any;

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
        {(status: any) => {
          let collapseClass = getTransitionClass(status);
          const classes = [
            className,
            horizontal && 'collapse-horizontal',
            collapseClass,
            navbar && 'navbar-collapse'
          ]
          const style = dimension === null ? null : { [horizontal ? 'width' : 'height']: dimension };
          return (
            <Tag
              {...childProps}
              style={{ ...childProps.style, ...style }}
              className={classes}
              ref={props.innerRef}
            >
              {children}
            </Tag>
          );
        }}
      </Transition>
    );
  }