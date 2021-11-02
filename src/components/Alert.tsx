import { mergeProps, splitProps } from 'solid-js';
import { Fade } from './Fade';
import { classname } from './utils';

type PropTypes = {
  children?: any,
  className?: string,
  closeClassName?: string,
  closeAriaLabel?: string,
  color?: string,
  fade?: boolean,
  isOpen?: boolean,
  toggle?: (e?: any) => void,
  tag?: any,
  transition?: any,
  ref?: any
};

const defaultProps = {
  color: 'success',
  isOpen: true,
  tag: 'div',
  closeAriaLabel: 'Close',
  fade: true,
  transition: {
    // ...Fade.defaultProps,
    unmountOnExit: true,
  },
};

export const Alert = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(props, defaultProps),
    ["className", "closeClassName", "closeAriaLabel", "tag", "ref",  "children",
    "color",
    "isOpen",
    "toggle",
    "transition",
    "fade",
  ]);

  const classes = classname([
    local.className,
    'alert',
    `alert-${local.color}`,
    { 'alert-dismissible': local.toggle }
  ])

  const closeClasses = classname(['btn-close', local.closeClassName])

  const alertTransition = {
    // ...Fade.defaultProps,
    ...local.transition,
    baseClass: local.fade ? local.transition.baseClass : '',
    timeout: local.fade ? local.transition.timeout : 0,
  };

  const toggleBtn = () => <button type="button" class={closeClasses} aria-label={local.closeAriaLabel} onClick={local.toggle} />

  const toggler = () => local.toggle ? toggleBtn() : null

  return (
    <Fade {...attributes} {...alertTransition} tag={local.tag} className={classes} in={local.isOpen} role="alert" innerRef={local.ref}>
      {toggler()}
      {local.children}
    </Fade>
  );
}