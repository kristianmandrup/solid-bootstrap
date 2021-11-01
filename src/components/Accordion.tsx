import { Component } from "solid-js";
import { Dynamic } from "solid-js/web";
import { AccordionContext } from './AccordionContext';
import { classname } from "./utils";
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

export const Accordion: Component = (props: PropTypes) => {
  let {
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


  const [state, setState] = createStore({ count: 0 });
  const store = [
    state,
    {
      toggle() {
        setState({count: state.count + 1});
      },
    },
  ];

  const classes = classname(
    className,
    'accordion',
    {
      'accordion-flush': flush
    }
  )    

  return (
    <AccordionContext.Provider value={store}>
      <Dynamic component={tag} class={classes} {...attributes}>
        {props.children}
      </Dynamic>
    </AccordionContext.Provider>
  );
};