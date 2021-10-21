import { createSignal } from 'solid-js';
import { Dropdown, PropTypes as DropdownPropTypes } from './Dropdown';
import { omit } from './utils';

const omitKeys = ['defaultOpen'];

interface PropTypes extends DropdownPropTypes  {
  defaultOpen?: boolean,
  onToggle?: (e: any, isOpen: boolean) => void,
  children?: any,
};

export const UncontrolledDropdown = (props: PropTypes) => {
  const [isOpen, setOpen] = createSignal(props.defaultOpen || false)

  const toggle = (e: any) => {
    const $isOpen = !isOpen();
    setOpen((open: any) => {
      if (props.onToggle) {
        props.onToggle(e, $isOpen);
      }
      return open
    });
  }

    return <Dropdown isOpen={isOpen()} toggle={toggle} {...omit(props, omitKeys)} />;
}

