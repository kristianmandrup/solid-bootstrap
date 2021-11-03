import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
};

const defaultProps = {
  tag: 'div'
};

export const CardColumns = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(props, defaultProps),
    ["className", "tag", 
  ]);

  const classes = () => classname(
    local.className,
    'card-columns'
  )

  return (
    <Dynamic component={local.tag} {...attributes} class={classes()} />
  );
};