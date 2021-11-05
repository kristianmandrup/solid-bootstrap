import { createSignal, mergeProps, onCleanup, onMount, splitProps } from 'solid-js';
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
  const [local, attributes]: any = splitProps(mergeProps(props, defaultProps),
  ["defaultOpen", "toggler", "toggleEvents"]);

  const [isOpen, setOpen] = createSignal(local.defaultOpen || false)

  const ctx: any = {}
  onMount(() => {
    const { togglers, toggle } = ctx
    ctx.togglers = findDOMElements(local.toggler);
    if (togglers.length) {
      ctx.removeEventListeners = addMultipleEventListeners(
        local.togglers,
        local.toggle,
        local.toggleEvents
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

    return <Collapse toggle={toggle} isOpen={isOpen()} {...attributes} />;
  }
