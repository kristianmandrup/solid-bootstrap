import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  type?: string,
  size?: string,
  color?: string,
  className?: string,
  children?: string
};

const defaultProps = {
  tag: 'div',
  type: 'border',
  children: 'Loading...'
};

export const Spinner = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(defaultProps, props),
  ["className", "tag", "type", "size", "color", "children"]);

  const classes = () => classname(
    local.className,
    local.size ? `spinner-${local.type}-${local.size}` : false,
      `spinner-${local.type}`,
      local.color ? `text-${local.color}` : false  
  )

  const Inside = () => local.children &&
  <span class={'visually-hidden'}>
    {local.children}
  </span>

  return (
    <Dynamic component={local.tag} role="status" {...attributes} class={classes()}>
      {Inside()}
    </Dynamic>
  );
};