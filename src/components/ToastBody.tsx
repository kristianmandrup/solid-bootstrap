import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  innerRef?: any,
  children?: any
};

const defaultProps = {
  tag: 'div'
};

export const ToastBody = (props: PropTypes) => {
  let {
    className,
    innerRef,
    tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any
  const classes = classname([
    className,
    'toast-body'
  ])

  return (
    <Dynamic component={tag} {...attributes} class={classes} ref={innerRef} />
  );
};