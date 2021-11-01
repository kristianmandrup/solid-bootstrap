import { useContext } from "solid-js";
import { Dynamic } from "solid-js/web";
import { AccordionContext } from ".";
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
  let {
    className,
    tag,
    innerRef,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;
  const classes = classname(
    className,
    'accordion-item',
  )
  const [state, { toggle }] = useContext(AccordionContext);
  console.log('item', {state, toggle});

  return (
    <Dynamic component={tag} {...attributes} class={classes} ref={innerRef} />
  );
};