import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  innerRef?: any,
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

  let {
    className,
    cssModule,
    active,
    tag,
    innerRef,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = classname([
    className,
    'nav-link',
    {
      disabled: attributes.disabled,
      active: active
    }
  ])

  return (
    <Dynamic component={tag} {...attributes} ref={innerRef} onClick={onClick} class={classes} />
  );
}