import { createSignal, mergeProps, splitProps } from "solid-js";
import { Accordion } from ".";

type PropTypes = {
  tag?: any,
  className?: string,
  innerRef?: any,
  children?: any,
  defaultOpen?: any[] | string,
  stayOpen?: boolean,
};

const defaultProps = {
  tag: 'div'
};

export const UncontrolledAccordion = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(defaultProps, props),
  ["defaultOpen", "stayOpen"]);
  const [open, setOpen] = createSignal(local.defaultOpen || (local.stayOpen ? [] : undefined));
  const toggle = (id: any) => {
    const $open = open()
    if (local.stayOpen) {
      $open.includes(id) ? setOpen($open.filter((accordionId: any) => accordionId !== id)) : setOpen([...$open, id]);
    } else {
      $open === id ? setOpen(undefined) : setOpen(id);
    }
  };

  return <Accordion {...attributes} open={open} toggle={toggle} />;
};