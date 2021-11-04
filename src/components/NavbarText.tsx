import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  active?: any,
  children?: any,
};

const defaultProps = {
  tag: 'span'
};

export const NavbarText = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(props, defaultProps),
  ["className", "tag", "active" ]);

  const classes = () => classname(
    local.className,
    'navbar-text'
  )

  return (
    <Dynamic component={local.tag} {...attributes} class={classes()} />
  );
};