import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  flush?: boolean,
  className?: string,
  horizontal?: boolean | string,
  numbered?: boolean
  children?: any
};

const defaultProps = {
  tag: 'ul',
  horizontal: false,
  numbered: false
};

export const ListGroup = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(props, defaultProps),
  ["className", "tag", "flush", "horizontal", "numbered"]);

  const getHorizontalClass = () => {
    if (local.horizontal === false) {
      return false;
    } else if (local.horizontal === true || local.horizontal === "xs") {
      return "list-group-horizontal";
    }
    return `list-group-horizontal-${local.horizontal}`;
  };
  

  const classes = () => classname(
    local.className,
    'list-group',
    // list-group-horizontal cannot currently be mixed with list-group-flush
    // we only try to apply horizontal classes if flush is false
    local.flush ? 'list-group-flush' : getHorizontalClass(),
    {
      'list-group-numbered': local.numbered
    }
  )

  return (
    <Dynamic component={local.tag} {...attributes} class={classes()} />
  );
};