import { mergeProps, splitProps } from "solid-js";
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
  const [local, attributes]: any = splitProps(mergeProps(defaultProps, props),
  ["className", "tag", "listClassName", "size", "listTag", "aria-label"]);

  const classes = () => local.className
  
  const listClasses = () => classname(
    local.listClassName,
    'pagination',
    {
      [`pagination-${local.size}`]: !!local.size,
    }
  );

  return (
    <Dynamic component={local.tag} class={classes()} aria-label={local.label}>
      <Dynamic component={local.listTag} {...attributes} class={listClasses()} />
    </Dynamic>
  );
};