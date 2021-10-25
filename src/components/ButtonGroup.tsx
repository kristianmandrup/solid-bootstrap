import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  'aria-label'?: string,
  className?: string,
  role?: string,
  size?: string,
  vertical?: boolean,
  children?: any
};

const defaultProps = {
  tag: 'div',
  role: 'group',
};

export const ButtonGroup = (props: PropTypes) => {
  const {
    className,
    size,
    vertical,
    tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;

  const classes = classname([
    className,
    size ? 'btn-group-' + size : false,
    vertical ? 'btn-group-vertical' : 'btn-group'
  ])

  return (
    <Dynamic component={tag} {...attributes} class={classes} />
  );
};