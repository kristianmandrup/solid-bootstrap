import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

const defaultProps = {
  color: 'secondary',
  pill: false,
  tag: 'span'
};

type PropTypes = {
  className?: string
  tag?: any
  color?: string
  pill?: boolean,
  ref?: any
  children?: any,
  href?: any
}

export const Badge = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
    ["className", "tag", "color", "pill"]);

  const classes = () => classname(
    local.className,
    'badge',
    'bg-' + local.color,
    local.pill ? 'rounded-pill' : false
  )

  const tag = () => {
    return attributes.href && local.tag === 'span' ? 'a' : local.tag  
  }

  return (
    <Dynamic component={tag()} class={classes()} {...attributes} ref={props.ref}/>
  );
};