import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  active?: boolean,
  disabled?: boolean,
  color?: string,
  action?: boolean,
  className?: any,
  children?: any
};

const defaultProps = {
  tag: 'li'
};

export const ListGroupItem = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(props, defaultProps),
  ["className", "tag", "active", "disabled", "action", "color",]);

  const handleDisabledOnClick = (e?: any) => {
    e.preventDefault();
  };
  
  const classes = () => classname(
    local.className,
    local.active ? 'active' : false,
    local.disabled ? 'disabled' : false,
    local.action ? 'list-group-item-action' : false,
    local.color ? `list-group-item-${local.color}` : false,
    'list-group-item'
  )

  const setAttribs = () => {
    // Prevent click event when disabled.
    if (local.disabled) {
      attributes.onClick = handleDisabledOnClick;
    }
    return true
  }

  return (
    <Dynamic component={local.tag} {...(setAttribs() && attributes)} class={classes()}>
      {props.children}
    </Dynamic>
  );
};