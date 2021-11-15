import { mergeProps, splitProps } from "solid-js";
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
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
    ["className", "tag", "active"]);

  const classes = classname(
    local.className,
    local.active ? 'active' : false,
    'breadcrumb-item'
  )

  return (
    <Dynamic component={local.tag} {...attributes} class={classes} aria-current={local.active ? 'page' : undefined} />
  );
};