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
  innerRef?: any,
  onClick?: (...args: any[]) => void,
  size?: string,
  children?: any,
  className?: string,
  id?: string,
  name?: string,
  type?: string,
  style?: string,
  close?: boolean,
};

const defaultProps = {
  color: 'secondary',
  tag: 'button',
};

export const Button = (props: PropTypes) => {
    let {
      active,
      'aria-label': ariaLabel,
      block,
      className,
      close,
      color,
      outline,
      size,
      tag,
      innerRef,
      ...attributes
    } = {
      ...defaultProps,
      ...props
    } as any;

    const btnOutlineColor = `btn${outline ? '-outline' : ''}-${color}`;

    const classes = classname(
      className,
      close && 'btn-close',
      close || 'btn',
      close || btnOutlineColor,
      size ? `btn-${size}` : false,
      block ? 'd-block w-100' : false,
      { active, disabled: props.disabled }
    )

    if (attributes.href && tag === 'button') {
      tag = 'a';
    }

    const defaultAriaLabel = close ? 'Close' : null;
    const type = (tag === 'button' && attributes.onClick) ? 'button' : undefined
    ariaLabel = ariaLabel || defaultAriaLabel
    return (
      <Dynamic component={tag} 
        type={type}
        {...attributes}
        class={classes}
        ref={innerRef}
        onClick={props.onClick}
        aria-label={ariaLabel}
      />
    );
  }