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
  const [local, attributes] = splitProps(mergeProps(props, defaultProps),
    ["className", "tag", "ref",  "children",
    "color",
    "pill",
  ]);

  const classes: string = classname([
    local.className,
    'badge',
    'bg-' + local.color,
    local.pill ? 'rounded-pill' : false
  ])

  if (attributes.href && local.tag === 'span') {
    local.tag = 'a';
  }

  return (
    <Dynamic component={local.tag} class={classes} {...attributes} ref={local.ref}/>
  );
};