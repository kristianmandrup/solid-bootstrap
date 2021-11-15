import { createSignal, mergeProps, splitProps } from 'solid-js';
import { ButtonDropdown, PropTypes as ButtonDropdownPropTypes } from './ButtonDropdown';
import { omit } from './utils';

interface PropTypes extends ButtonDropdownPropTypes {
  defaultOpen: boolean,
};

const defaultProps = {}

export const UncontrolledButtonDropdown = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(defaultProps, props),
  ["defaultOpen"]);

  const [isOpen, setOpen] = createSignal(local.defaultOpen || false)

  const toggle = () => {
    setOpen(!isOpen)
  }

    return <ButtonDropdown isOpen={isOpen()} toggle={toggle} {...attributes} />;
}

