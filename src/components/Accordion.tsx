import type { Component } from "solid-js";
import { createMemo } from 'solid-js';
import { Dynamic } from "solid-js/web";
import { AccordionContext } from './AccordionContext';
import { classname } from "./utils";

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

export const Accordion: Component = (props: PropTypes) => {
  const {
    flush,
    open,
    toggle,
    className,
    tag,
    innerRef,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;
  const classes = classname([
    className,
    'accordion',
    {
      'accordion-flush': flush
    }
  ])

  const accordionContext = createMemo(() => ({
    open,
    toggle,
  }));

  return (
    <AccordionContext.Provider value={accordionContext}>
      <Dynamic component={tag} {...attributes} class={classes} ref={innerRef} />
    </AccordionContext.Provider>
  );
};