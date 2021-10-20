import { createSignal } from 'solid-js';
import { ButtonDropdown, PropTypes as ButtonDropdownPropTypes } from './ButtonDropdown';
import { omit } from './utils';

interface PropTypes extends ButtonDropdownPropTypes {
  defaultOpen: boolean,
};

const omitKeys = ['defaultOpen'];

export const UncontrolledButtonDropdown = (props: PropTypes) => {
  const [isOpen, setOpen] = createSignal(props.defaultOpen || false)

  const toggle = () => {
    setOpen(!isOpen)
  }

    return <ButtonDropdown isOpen={isOpen()} toggle={toggle} {...omit(props, omitKeys)} />;
}

