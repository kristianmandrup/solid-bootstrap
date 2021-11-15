import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  'aria-label'?: string,
  className?: string,
  role?: string,
  size?: string,
  vertical?: boolean,
  children?: any
};

const defaultProps = {
  tag: 'div',
  role: 'group',
};

export const ButtonGroup = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
    ["className", "tag", "size", "vertical"]);

  const classes = () => classname(
    local.className,
    local.size ? 'btn-group-' + local.size : false,
    local.vertical ? 'btn-group-vertical' : 'btn-group'
  )

  return (
    <Dynamic component={local.tag} {...attributes} class={classes()} />
  );
};