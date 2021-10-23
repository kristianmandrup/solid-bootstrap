import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  active?: boolean,
  children?: any,
  className?: string,  
  disabled?: boolean,
  tag?: any,
};

const defaultProps = {
  tag: 'li',
};

export const PaginationItem = (props: PropTypes) => {
  const {
    active,
    className,
    disabled,
    tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = classname([
    className,
    'page-item',
    {
      active,
      disabled,
    }
  ])

  return (
    <Dynamic component={tag} {...attributes} className={classes} />
  );
};