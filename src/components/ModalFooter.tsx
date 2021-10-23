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

export const ModalFooter = (props: PropTypes) => {
  const {
    className,
    tag,
    ...attributes } = {
      ...defaultProps,
      ...props
    } as any
  const classes = classname([
    className,
    'modal-footer'
  ])

  return (
    <Dynamic component={tag} {...attributes} className={classes} />
  );
};