import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from '../components';
import { createSignal } from 'solid-js';

export default () => {
  const [dropdownOpen, setDropdownOpen] = createSignal(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <div>
      <a href="https://reactstrap.github.io/?path=/docs/components-dropdown--dropdown">Dropdown docs</a>
      <p/>      
      <Dropdown isOpen={dropdownOpen()} toggle={toggle}>
        <DropdownToggle caret>
          Dropdown
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem>Some Action</DropdownItem>
          <DropdownItem text>Dropdown Item Text</DropdownItem>
          <DropdownItem disabled>Action (disabled)</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Foo Action</DropdownItem>
          <DropdownItem>Bar Action</DropdownItem>
          <DropdownItem>Quo Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}