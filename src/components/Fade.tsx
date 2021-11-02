import { Dynamic } from 'solid-js/web';
import { Transition } from 'solid-transition-group';
import { classname, omit, pick, TransitionPropTypeKeys, TransitionTimeouts } from './utils';

export type PropTypes = {
  // ...Transition.propTypes,
  children?: any,
  tag?: any,
  baseClass?: string,
  baseClassActive?: string,
  className?: string,
  innerRef?: any
  timeout?: any,
  appear?: boolean,
  enter?: boolean,
  exit?: boolean,
  in?: boolean,
  onClick?: (e?: any) => void
  onMouseDown?: (e?: any) => void
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
  let {
    tag,
    baseClass,
    baseClassActive,
    className,
    innerRef,
    ...otherProps
  } = {
    ...defaultProps,
    ...props
  } as any;

  const transitionProps = pick(otherProps, TransitionPropTypeKeys);
  const childProps = omit(otherProps, TransitionPropTypeKeys);

  return (
    <Transition {...transitionProps}>
      {(status: any) => {
        const isActive = status === 'entered';
        const classes = classname(
          className,
          baseClass,
          isActive && baseClassActive
        )
        return (
          <Dynamic component={tag} class={classes} {...childProps} ref={innerRef}>
            {props.children}
          </Dynamic>
        );
      }}
    </Transition>
  );
}

Fade.defaultProps = defaultProps