import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  active?: boolean,
  className?: string,
  children?: any,
};

const defaultProps = {
  tag: 'li'
};

export const NavItem = (props: PropTypes) => {
  const {
    className,
    active,
    tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = classname(
    className,
    'nav-item',
    active ? 'active' : false
  )

  return (
    <Dynamic component={tag} {...attributes} class={classes}>{props.children}</Dynamic>
  );
};