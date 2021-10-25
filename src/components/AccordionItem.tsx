import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  innerRef?: any,
  children?: any,
};

const defaultProps = {
  tag: 'div'
};

export const AccordionItem = (props: PropTypes) => {
  const {
    className,
    tag,
    innerRef,
    ...attributes
  } = props;
  const classes = classname([
    className,
    'accordion-item',
  ])

  return (
    <Dynamic component={tag}  {...attributes} class={classes} ref={innerRef} />
  );
};