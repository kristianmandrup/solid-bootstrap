import { Transition } from 'solid-transition-group';
import { omit, pick, TransitionPropTypeKeys, TransitionTimeouts } from './utils';

type PropTypes = {
  // ...Transition.propTypes,
  children?: any,
  tag?: any,
  baseClass: string,
  baseClassActive: string,
  className: string,
  innerRef: any
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
  const {
    tag: Tag,
    baseClass,
    baseClassActive,
    className,
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
    <Transition {...transitionProps}>
      {(status: any) => {
        const isActive = status === 'entered';
        const classes = [
          className,
          baseClass,
          isActive && baseClassActive
        ]
        return (
          <Tag className={classes} {...childProps} ref={innerRef}>
            {children}
          </Tag>
        );
      }}
    </Transition>
  );
}