import { Dropdown } from './Dropdown';

export type PropTypes = {
  children?: any
};

export const ButtonDropdown = (props: PropTypes) => {
  return (
    <Dropdown group {...props} />
  );
};