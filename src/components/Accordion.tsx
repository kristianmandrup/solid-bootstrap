import { Component, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { AccordionContext } from './AccordionContext';
import { classname, omit } from "./utils";
import { createStore } from "solid-js/store"

type PropTypes = {
  tag?: any,
  className?: string,
  innerRef?: any,
  children?: any,
  flush?: boolean,
  open?: any,
  toggle?: (e?: any) => void,
};

const defaultProps = {
  tag: 'div'
};

export const Accordion = (props: PropTypes) => {
  const [local, context, attributes] = splitProps(mergeProps(props, defaultProps),
    ["flush", "className", "tag"],
    ["open", "toggle"]
  );

  const classes = () => classname(
    local.className,
    'accordion',
    {
      'accordion-flush': local.flush
    }
  )

  return (
    <AccordionContext.Provider value={context}>
      <Dynamic {...attributes} tag={local.tag || "div"} className={classes()} />
    </AccordionContext.Provider>
  );
};