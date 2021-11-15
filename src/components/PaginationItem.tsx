import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  active?: boolean,
  children?: any,
  className?: string,  
  disabled?: boolean,
  tag?: any,
};

const defaultProps = {
  tag: 'li',
};

export const PaginationItem = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(defaultProps, props),
  ["className", "tag", "active", "disabled"]);

  const classes = () => classname(
    local.className,
    'page-item',
    {
      active: local.active,
      disabled: local.disabled,
    }
  )

  return (
    <Dynamic component={local.tag} {...attributes} class={classes()} />
  );
};