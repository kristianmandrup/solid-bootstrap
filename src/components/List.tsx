import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  type?: string
  ref?: any
  children?: any
};

const defaultProps ={
  tag: 'ul'
};

export const List = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(props, defaultProps),
  ["className", "tag", "type", "ref"]);

  const classes = () => classname(
    local.className,
    local.type ? `list-${local.type}` : false
  )

  return (
    <Dynamic 
      component={local.tag} 
      {...attributes} 
      class={classes()} 
      ref={local.ref} />
  );
}