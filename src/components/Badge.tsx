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
  innerRef?: any
  children?: any,
}

export const Badge = (props: PropTypes) => {
  let {
    className,
    color,
    innerRef,
    pill,
    tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;

  const classes: string = classname([
    className,
    'badge',
    'bg-' + color,
    pill ? 'rounded-pill' : false
  ])

  if (attributes.href && tag === 'span') {
    tag = 'a';
  }

  return (
    <Dynamic component={tag} class={classes} {...attributes} ref={innerRef}/>
  );
};