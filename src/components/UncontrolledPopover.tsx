import { createSignal, mergeProps, splitProps } from 'solid-js';
import { Popover, PropTypes as PopoverPropTypes } from './Popover';
import { omit } from './utils';

interface PropTypes extends PopoverPropTypes  {
  defaultOpen?: boolean,
  children?: any,
  trigger?: any
  placement?: any
};

const defaultProps = {}

export const UncontrolledPopover = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(props, defaultProps),
  ["defaultOpen"]);

  const [isOpen, setOpen] = createSignal(local.defaultOpen || false)
  
  const toggle = () => {
    setOpen(!isOpen());
  }

    return <Popover isOpen={isOpen()} toggle={toggle} {...attributes} />;
}

