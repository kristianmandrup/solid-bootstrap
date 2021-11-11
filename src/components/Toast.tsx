import { mergeProps, splitProps } from 'solid-js';
import { Fade, PropTypes as FadePropTypes } from './Fade';
import { classname } from './utils';

type PropTypes = {
  children?: any,
  className?: string,
  fade?: boolean,
  isOpen?: boolean,
  tag?: any,
  transition?: FadePropTypes,
  ref?: any,
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
  const [local, attributes]: any = splitProps(mergeProps(props, defaultProps),
  ["className", "tag", "isOpen", "fade", "transition"]);

  const classes = () => classname(local.className, 'toast')

  const toastTransition = {
    ...Fade.defaultProps,
    ...local.transition,
    baseClass: local.fade ? local.transition && local.transition.baseClass : '',
    timeout: local.fade ? local.transition && local.transition.timeout : 0,
  };

  return (
    <Fade {...attributes} {...toastTransition} tag={local.tag} className={classes()} in={local.isOpen} data-role="alert" ref={props.ref} />
  );
}