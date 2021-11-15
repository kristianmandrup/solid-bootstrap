import { mergeProps, splitProps } from "solid-js";
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
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
  ["className", "tag", "active"  ]);

  const classes = () => classname(
    local.className,
    'nav-item',
    local.active ? 'active' : false
  )

  return (
    <Dynamic component={local.tag} {...attributes} class={classes()} />
  );
};