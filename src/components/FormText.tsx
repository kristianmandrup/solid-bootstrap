import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  children?: any,
  inline?: boolean,
  tag?: any,
  color?: string,
  className?: string,
};

const defaultProps = {
  tag: 'small',
  color: 'muted',
};

export const FormText = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
  ["className", "tag", "color", "inline", ]);

  const classes = () => classname(
    local.className,
    !local.inline ? 'form-text' : false,
    local.color ? `text-${local.color}` : false
  )

  return (
    <Dynamic 
      component={local.tag} 
      {...attributes} 
      class={classes()} />
  );
};