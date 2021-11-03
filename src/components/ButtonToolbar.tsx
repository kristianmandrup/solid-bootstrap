import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  'aria-label'?: string,
  className?: string,
  role?: string,
};

const defaultProps = {
  tag: 'div',
  role: 'toolbar',
};

export const ButtonToolbar = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(props, defaultProps), [
    "className", "tag"
  ]);

  const classes = () => classname(
    local.className,
    'btn-toolbar'
  )

  return (
    <Dynamic component={local.tag} {...attributes} class={classes()} />
  );
};
