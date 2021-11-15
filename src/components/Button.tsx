import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname, classnames } from "./utils";

type PropTypes = {
  active?: boolean,
  'aria-label'?: string,
  block?: boolean,
  color?: string,
  disabled?: boolean,
  outline?: boolean,
  tag?: any,
  ref?: any,
  onClick?: (...args: any[]) => void,
  size?: string,
  children?: any,
  className?: string,
  id?: string,
  name?: string,
  type?: string,
  style?: string,
  href?: string,
  close?: boolean,
};

const defaultProps = {
  color: 'secondary',
  tag: 'button',
};

export const Button = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
    ["className", "tag", "active", "disabled","aria-label", "block",
    "close", "color", "outline", "size"
  ]);

  const btnOutlineColor = () => `btn${local.outline ? '-outline' : ''}-${local.color}`;

  const classes = () => classname(
    local.className,
    local.close && 'btn-close',
    local.close || 'btn',
    local.close || btnOutlineColor(),
    local.size ? `btn-${local.size}` : false,
    local.block ? 'd-block w-100' : false,
    { active: local.active, disabled: local.disabled }
  )

  const tag = () => attributes.href && local.tag === 'button' ? 'a' : local.tag

  const defaultAriaLabel = () => local.close ? 'Close' : null;
  const type = () => (local.tag === 'button' && attributes.onClick) ? 'button' : undefined
  return (
    <Dynamic component={tag()} 
      type={type()}
      {...attributes}
      class={classes()}
      ref={props.ref}
      aria-label={local['aria-label'] || defaultAriaLabel()}
    />
  );
}