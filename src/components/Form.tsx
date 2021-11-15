import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  children?: any,
  inline?: boolean,
  tag?: any,
  ref?: any,
  className?: string,
};

const defaultProps = {
  tag: 'form',
};

export const Form = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
  ["className", "tag", "inline"]);

  const classes = () => classname(
    local.className,
    local.inline ? 'form-inline' : false
  )

  return (
    <Dynamic component={local.tag} {...attributes} ref={props.ref} class={classes()} />
  );
}
