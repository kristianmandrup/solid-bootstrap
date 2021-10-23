import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  children?: any,
  href?: string,
};

const defaultProps = {
  tag: 'a'
};

export const NavbarBrand = (props: PropTypes) => {
  const {
    className,
    tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = classname([
    className,
    'navbar-brand'
  ])

  return (
    <Dynamic component={tag} {...attributes} className={classes} />
  );
};