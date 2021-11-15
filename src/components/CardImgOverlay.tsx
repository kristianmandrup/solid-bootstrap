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

export const CardImgOverlay = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
    ["className", "tag", 
  ]);
  
  const classes = () => classname(
    local.className,
    'card-img-overlay'
  )

  return (
    <Dynamic component={local.tag} {...attributes} class={classes()} />
  );
};