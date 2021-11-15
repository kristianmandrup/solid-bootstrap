import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  ref?: any,
  className?: string,
  children?: any
};

const defaultProps = {
  tag: 'a'
};

export const CardLink = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
    ["className", "tag"
  ]);

  const classes = () => classname(
    local.className,
    'card-link'
  )

  return (
    <Dynamic component={local.tag} {...attributes} ref={props.ref} class={classes()} />
  );
};
