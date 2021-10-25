import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  children?: any
};

const defaultProps = {
  tag: 'h3'
};

export const PopoverHeader = (props: PropTypes) => {
  const {
    className,
    tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = classname([
    className,
    'popover-header'
  ])

  return (
    <Dynamic component={tag} {...attributes} class={classes} />
  );
};