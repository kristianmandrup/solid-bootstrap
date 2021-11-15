import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  ref?: any,
  disabled?: boolean,
  active?: boolean,
  className?: string,
  onClick?: (e?: any) => void,
  href?: any,
  children?: any,
};

const defaultProps = {
  tag: 'a',
};

export const NavLink = (props: PropTypes) => {
  const onClick = (e?: any) => {
    if (props.disabled) {
      e.preventDefault();
      return;
    }

    if (props.href === '#') {
      e.preventDefault();
    }

    if (props.onClick) {
      props.onClick(e);
    }
  }

  const [local, attributes]: any = splitProps(mergeProps(defaultProps, props),
  ["className", "tag", "active"]);

  const classes = () => classname(
    local.className,
    'nav-link',
    {
      disabled: attributes.disabled,
      active: local.active
    }
  )

  return (
    <Dynamic component={local.tag} 
      {...attributes} 
      ref={props.ref} 
      onClick={onClick} 
      class={classes()} />
  );
}