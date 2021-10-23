import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  'aria-label'?: string,
  className?: string,
  role?: string,
};

const defaultProps = {
  tag: 'div',
  role: 'toolbar',
};

export const ButtonToolbar = (props: PropTypes) => {
  const {
    className,
    tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;

  const classes = classname([
    className,
    'btn-toolbar'
  ])

  return (
    <Dynamic component={tag} {...attributes} className={classes} />
  );
};
