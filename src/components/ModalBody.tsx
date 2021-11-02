import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  children?: any
};

const defaultProps = {
  tag: 'div',
};

export const ModalBody = (props: PropTypes) => {
  const {
    className,
    tag,
    ...attributes 
  } = {
    ...defaultProps,
    ...props
  } as any
  const classes = classname(
    className,
    'modal-body'
  )

  return (
    <Dynamic component={tag} {...attributes} class={classes}>{props.children}</Dynamic>
  );
};