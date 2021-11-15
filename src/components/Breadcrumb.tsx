import { mergeProps, splitProps } from "solid-js";
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
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
    ["className", "tag", "listClassName", "listTag", "aria-label", "children"]);

  const classes = local.className

  const listClasses = classname(
    'breadcrumb',
    local.listClassName
  );

  return (
    <Dynamic component={local.tag} {...attributes} class={classes} aria-label={local['aria-label']}>
      <Dynamic component={local.listTag} class={listClasses} children={local.children} />      
    </Dynamic>
  );
};