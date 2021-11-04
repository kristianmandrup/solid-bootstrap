import { mergeProps, splitProps } from "solid-js";
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
  const [local, attributes] = splitProps(mergeProps(props, defaultProps),
  ["className", "tag" ]);

  const classes = () => classname(
    local.className,
    'navbar-brand'
  )

  return (
    <Dynamic component={local.tag} {...attributes} class={classes()} />
  );
};