import { Dynamic } from "solid-js/web";
import { classname, classnames } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  children?: any
};

const defaultProps = {
  tag: 'span'
};

export const InputGroupText = (props: PropTypes) => {
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
    'input-group-text'
  ])

  return (
    <Dynamic component={tag} {...attributes} class={classes} />
  );
}

