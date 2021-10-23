import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  type?: string,
  className?: string,
  children?: any,
  onClick?: (e?: any) => void
};

const defaultProps = {
  tag: 'button',
  type: 'button'
};

export const NavbarToggler = (props: PropTypes) => {
  const {
    className,
    children,
    tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = classname([
    className,
    'navbar-toggler'
  ])

  return (
    <Dynamic component={tag} aria-label="Toggle navigation" {...attributes} className={classes}>
      {children || <span className={'navbar-toggler-icon'} />}
    </Dynamic>
  );
};