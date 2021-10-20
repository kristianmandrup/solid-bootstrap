import { createSignal } from 'solid-js';
import { Popover, PropTypes as PopoverPropTypes } from './Popover';
import { omit } from './utils';

interface PropTypes extends PopoverPropTypes  {
  defaultOpen?: boolean,
};

const omitKeys = ['defaultOpen'];

export const UncontrolledPopover = (props: PropTypes) => {
  const [isOpen, setOpen] = createSignal(props.defaultOpen || false)
  
  const toggle = () => {
    setOpen(!isOpen());
  }

    return <Popover isOpen={isOpen()} toggle={toggle} {...omit(props, omitKeys)} />;
}

