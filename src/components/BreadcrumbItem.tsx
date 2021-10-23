import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  active?: boolean,
  className?: string,
  children?: any,
};

const defaultProps = {
  tag: 'li'
};

export const BreadcrumbItem = (props: PropTypes) => {
  const {
    className,
    active,
    tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;
  const classes = classname([
    className,
    active ? 'active' : false,
    'breadcrumb-item'
  ])

  return (
    <Dynamic component={tag} {...attributes} className={classes} aria-current={active ? 'page' : undefined} />
  );
};