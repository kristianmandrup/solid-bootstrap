import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  listTag?: any,
  className?: string,
  listClassName?: string,
  children?: any,
  'aria-label'?: string
};

const defaultProps = {
  tag: 'nav',
  listTag: 'ol',
  'aria-label': 'breadcrumb'
};

export const Breadcrumb = (props: PropTypes) => {
  const {
    className,
    listClassName,
    children,
    tag,
    listTag: ListTag,
    'aria-label': label,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;

  const classes = classname([
    className
  ]);

  const listClasses = classname([
    'breadcrumb',
    listClassName
  ]);

  return (
    <Dynamic component={tag} {...attributes} className={classes} aria-label={label}>
      <ListTag className={listClasses}>
        {children}
      </ListTag>
    </Dynamic>
  );
};