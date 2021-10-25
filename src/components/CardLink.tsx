import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  innerRef?: any,
  className?: string,
  children?: any
};

const defaultProps = {
  tag: 'a'
};

export const CardLink = (props: PropTypes) => {
  let {
    className,
    tag,
    innerRef,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;
  const classes = classname(
    className,
    'card-link'
  )

  return (
    <Dynamic component={tag} {...attributes} ref={innerRef} class={classes} />
  );
};
