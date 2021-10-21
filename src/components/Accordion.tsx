import type { Component } from "solid-js";
import { createMemo } from 'solid-js';
import { AccordionContext } from './AccordionContext';

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
    tag: Tag,
    innerRef,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;
  const classes = [
    className,
    'accordion',
    {
      'accordion-flush': flush
    }
  ]

  const accordionContext = createMemo(() => ({
    open,
    toggle,
  }));

  return (
    <AccordionContext.Provider value={accordionContext}>
      <Tag {...attributes} className={classes} ref={innerRef} />
    </AccordionContext.Provider>
  );
};