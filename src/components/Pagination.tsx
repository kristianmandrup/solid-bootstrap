import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  children?: any,
  className?: string,
  listClassName?: string,
  size?: string,
  tag?: any,
  listTag?: any,
  'aria-label'?: string
};

const defaultProps = {
  tag: 'nav',
  listTag: 'ul',
  'aria-label': 'pagination'
};

export const Pagination = (props: PropTypes) => {
  const {
    className,
    listClassName,
    size,
    tag,
    listTag: ListTag,
    'aria-label': label,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = classname([
    className
  ]);

  const listClasses = classname([
    listClassName,
    'pagination',
    {
      [`pagination-${size}`]: !!size,
    }
  ]);

  return (
    <Dynamic component={tag} className={classes} aria-label={label}>
      <ListTag {...attributes} className={listClasses} />
    </Dynamic>
  );
};