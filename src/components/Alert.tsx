import { Fade } from './Fade';

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
  innerRef?: any
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
  const {
    className,
    closeClassName,
    closeAriaLabel,
    tag: Tag,
    color,
    isOpen,
    toggle,
    children,
    transition,
    fade,
    innerRef,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;

  const classes = [
    className,
    'alert',
    `alert-${color}`,
    { 'alert-dismissible': toggle }
  ]

  const closeClasses = ['btn-close', closeClassName]

  const alertTransition = {
    // ...Fade.defaultProps,
    ...transition,
    baseClass: fade ? transition.baseClass : '',
    timeout: fade ? transition.timeout : 0,
  };

  return (
    <Fade {...attributes} {...alertTransition} tag={Tag} className={classes} in={isOpen} role="alert" innerRef={innerRef}>
      {toggle ?
        <button type="button" className={closeClasses.join(' ')} aria-label={closeAriaLabel} onClick={toggle} />
        : null}
      {children}
    </Fade>
  );
}