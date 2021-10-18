import { Dropdown } from './Dropdown';

type PropTypes = {
  children: any
};

export const ButtonDropdown = (props: PropTypes) => {
  return (
    <Dropdown group {...props} />
  );
};