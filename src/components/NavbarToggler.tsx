import { mergeProps, splitProps } from "solid-js";
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
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
  ["className", "tag", "children"]);

  const classes = () => classname(
    local.className,
    'navbar-toggler'
  )

  return (
    <Dynamic component={local.tag} aria-label="Toggle navigation" {...attributes} class={classes()}>
      {local.children || <span class={'navbar-toggler-icon'} />}
    </Dynamic>
  );
};