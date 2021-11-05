import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  ref?: any,
  children?: any
};

const defaultProps = {
  tag: 'div'
};

export const ToastBody = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(props, defaultProps),
  ["className", "tag", "ref"]);

  const classes = () => classname(
    local.className,
    'toast-body'
  )

  return (
    <Dynamic 
      component={local.tag} 
      {...attributes} 
      class={classes()} 
      ref={local.ref}/>
  );
};