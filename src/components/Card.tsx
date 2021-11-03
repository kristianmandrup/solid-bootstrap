import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  inverse?: boolean,
  color?: string,
  body?: boolean,
  outline?: boolean,
  className?: string,
  ref?: any
  children?: any
};

const defaultProps = {
  tag: 'div'
};

export const Card = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(props, defaultProps),
    ["className", "tag",
    "inverse", "body", "color", "outline",  "ref",
  ]);

  const classes = () => classname(
    local.className,
    'card',
    local.inverse ? 'text-white' : false,
    local.body ? 'card-body' : false,
    local.color ? `${local.outline ? 'border' : 'bg'}-${local.color}` : false
  )

  return (
    <Dynamic component={local.tag} {...attributes} class={classes()} ref={local.ref} />
  );
};