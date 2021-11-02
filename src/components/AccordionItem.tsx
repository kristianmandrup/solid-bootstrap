import { mergeProps, splitProps, useContext } from "solid-js";
import { Dynamic } from "solid-js/web";
import { AccordionContext } from ".";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  ref?: any,
  children?: any,
};

const defaultProps = {
  tag: 'div'
};

export const AccordionItem = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(props, defaultProps),
    ["className", "tag", "ref",  "children"],
  );

  const classes = classname(
    local.className,
    'accordion-item',
  )

  return (
    <Dynamic component={local.tag} {...attributes} class={classes} innerRef={local.ref}>
      {props.children}
    </Dynamic>
  );
};