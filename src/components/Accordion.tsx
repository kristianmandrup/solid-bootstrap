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

export const Accordion: Component = (props: PropTypes) => {
  const mprops = mergeProps({
    ...defaultProps,
    ...props
  });

  const [local, attributes] = splitProps(mprops,
    ["flush", "open", "toggle", "className", "tag", "innerRef"],
  );

  const classes = classname(
    local.className,
    'accordion',
    {
      'accordion-flush': local.flush
    }
  )    

  const [state, setState] = createStore({ open: local.open });
  const store = [
    state,
    {
      toggle() {
        setState(s => ({open: !s.open}));
      },
    },
  ];

  return (
    <AccordionContext.Provider value={store}>
      <Dynamic component={local.tag} class={classes} {...attributes} ref={local.innerRef}/>
    </AccordionContext.Provider>
  );
};