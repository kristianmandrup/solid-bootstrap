import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname, classnames } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  children?: any
};

const defaultProps = {
  tag: 'span'
};

export const InputGroupText = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
  ["className", "tag"]);

  const classes = () => classname(
    local.className,
    'input-group-text'
  )

  return (
    <Dynamic 
      component={local.tag} 
      {...attributes} 
      class={classes()}/>
  );
}

