import { createSignal, onCleanup, onMount } from 'solid-js';
import { Collapse } from './Collapse';
import { omit, findDOMElements, defaultToggleEvents, addMultipleEventListeners } from './utils';

const omitKeys = ['toggleEvents', 'defaultOpen'];

type PropTypes = {
  defaultOpen?: boolean,
  toggler: string,
  toggleEvents?: string[]
};

const defaultProps = {
  toggleEvents: defaultToggleEvents
};

export const UncontrolledCollapse = (props: PropTypes) => {
  const [isOpen, setOpen] = createSignal(props.defaultOpen || false)

  const ctx: any = {}
  onMount(() => {
    const { togglers, toggle } = ctx
    ctx.togglers = findDOMElements(props.toggler);
    if (togglers.length) {
      ctx.removeEventListeners = addMultipleEventListeners(
        togglers,
        toggle,
        props.toggleEvents
      );
    }
  })

  onCleanup(() => {
    if (ctx.togglers.length && ctx.removeEventListeners) {
      ctx.removeEventListeners();
    }
  })

  const toggle = (e:any) => {
    setOpen(!isOpen());
    e.preventDefault();
  }

    return <Collapse isOpen={isOpen()} {...omit(props, omitKeys)} />;
  }
