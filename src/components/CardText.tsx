import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  children?: any
};

const defaultProps = {
  tag: 'p'
};

export const CardText = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
    ["className", "tag"
  ]);

  const classes = () => classname(
    local.className,
    'card-text'
  )

  return (
    <Dynamic component={local.tag} {...attributes} class={classes()} />
  );
};