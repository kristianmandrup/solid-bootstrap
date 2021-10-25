import { Fade, PropTypes as FadePropTypes } from './Fade';
import { classname } from './utils';

type PropTypes = {
  children?: any,
  className?: string,
  fade?: boolean,
  isOpen?: boolean,
  tag?: any,
  transition?: FadePropTypes,
  innerRef?: any,
};

const defaultProps = {
  isOpen: true,
  tag: 'div',
  fade: true,
  transition: {
    ...Fade.defaultProps,
    unmountOnExit: true,
  },
};

export const Toast = (props: PropTypes) => {
  const {
    className,
    tag,
    isOpen,
    children,
    transition,
    fade,
    innerRef,
    ...attributes
  } = props;

  const classes = classname([className, 'toast'])

  const toastTransition = {
    ...Fade.defaultProps,
    ...transition,
    baseClass: fade ? transition && transition.baseClass : '',
    timeout: fade ? transition && transition.timeout : 0,
  };

  return (
    <Fade {...attributes} {...toastTransition} tag={tag} className={classes} in={isOpen} data-role="alert" innerRef={innerRef}>
      {children}
    </Fade>
  );
}