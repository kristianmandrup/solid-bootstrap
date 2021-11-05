import { createSignal, mergeProps, splitProps } from 'solid-js';
import { Dropdown, PropTypes as DropdownPropTypes } from './Dropdown';

interface PropTypes extends DropdownPropTypes  {
  defaultOpen?: boolean,
  onToggle?: (e: any, isOpen: boolean) => void,
  children?: any,
};

const defaultProps = {}

export const UncontrolledDropdown = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(props, defaultProps),
  ["defaultOpen", "onToggle"]);

  const [isOpen, setOpen] = createSignal(local.defaultOpen || false)

  const toggle = (e: any) => {
    const $isOpen = !isOpen();
    setOpen((open: any) => {
      if (local.onToggle) {
        local.onToggle(e, $isOpen);
      }
      return open
    });
  }

    return <Dropdown isOpen={isOpen()} toggle={toggle} {...attributes} />;
}

