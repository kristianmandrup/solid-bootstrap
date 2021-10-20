import { createSignal } from "solid-js";
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

export const UncontrolledAccordion = ({ defaultOpen, stayOpen, ...props }: any) => {
  const [open, setOpen] = createSignal(defaultOpen || (stayOpen ? [] : undefined));
  const toggle = (id: any) => {
    const $open = open()
    if (stayOpen) {
      $open.includes(id) ? setOpen($open.filter((accordionId: any) => accordionId !== id)) : setOpen([...$open, id]);
    } else {
      $open === id ? setOpen(undefined) : setOpen(id);
    }
  };

  return <Accordion {...props} open={open} toggle={toggle} />;
};