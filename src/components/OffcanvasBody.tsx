import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
};

const defaultProps = {
  tag: 'div',
};

export const OffcanvasBody = (props: PropTypes) => {
  const {
    className,
    tag,
    ...attributes } = {
    ...defaultProps,
    ...props
  } as any
  const classes = classname([
    className,
    'offcanvas-body'
  ]);

  return (
    <Dynamic component={tag} {...attributes} className={classes} />
  );
};