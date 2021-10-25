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

const getHorizontalClass = (horizontal: any) => {
  if (horizontal === false) {
    return false;
  } else if (horizontal === true || horizontal === "xs") {
    return "list-group-horizontal";
  }
  return `list-group-horizontal-${horizontal}`;
};

export const ListGroup = (props: PropTypes) => {
  const {
    className,
    tag,
    flush,
    horizontal,
    numbered,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any
  const classes = classname([
    className,
    'list-group',
    // list-group-horizontal cannot currently be mixed with list-group-flush
    // we only try to apply horizontal classes if flush is false
    flush ? 'list-group-flush' : getHorizontalClass(horizontal),
    {
      'list-group-numbered': numbered
    }
  ])

  return (
    <Dynamic component={tag} {...attributes} class={classes} />
  );
};