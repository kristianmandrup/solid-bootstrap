import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname, classnames } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  ref: string
  children?: any
};

const defaultProps ={
  tag: 'li'
};

export const ListInlineItem = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(props, defaultProps),
  ["className", "tag"]);
  
  const classes = () => classname([
    local.className,
    'list-inline-item'
  ])

  return (
    <Dynamic 
      component={local.tag} 
      {...attributes} 
      class={classes()} 
      ref={props.ref}>
    {props.children}
    </Dynamic>
  );
}