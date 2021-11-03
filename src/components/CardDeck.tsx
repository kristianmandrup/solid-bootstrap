import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  children?: any
};

const defaultProps = {
  tag: 'div',
};

export const CardDeck = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(props, defaultProps),
    ["className", "tag", 
  ]);

  const classes = () => classname(
    local.className,
    'card-deck'
  )

  return (
    <Dynamic component={local.tag} {...attributes} class={classes()} />
  );
};