import { Dropdown, PropTypes as DropdownPropTypes } from './Dropdown';

export interface PropTypes extends DropdownPropTypes {
  children?: any
};

export const ButtonDropdown = (props: PropTypes) => {
  return (
    <Dropdown group {...props} />
  );
};