import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  inverse?: boolean,
  color?: string,
  body?: boolean,
  outline?: boolean,
  className?: string,
  innerRef?: any
  children?: any
};

const defaultProps = {
  tag: 'div'
};

export const Card = (props: PropTypes) => {
  const {
    className,
    color,
    body,
    inverse,
    outline,
    tag,
    innerRef,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;

  const classes = classname([
    className,
    'card',
    inverse ? 'text-white' : false,
    body ? 'card-body' : false,
    color ? `${outline ? 'border' : 'bg'}-${color}` : false
  ])

  return (
    <Dynamic component={tag} {...attributes} className={classes} ref={innerRef} />
  );
};