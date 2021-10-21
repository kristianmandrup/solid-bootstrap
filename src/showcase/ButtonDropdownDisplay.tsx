import { createSignal } from 'solid-js';
import { ButtonDropdown, DropdownToggle } from '../components'

export default () => {
  const [dropdownOpen, setOpen] = createSignal(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown isOpen={dropdownOpen()} toggle={toggle}>
      <DropdownToggle caret>
        <a href="https://reactstrap.github.io/components/button-dropdown/">Button Dropdown component</a>
      </DropdownToggle>
    </ButtonDropdown>
  )
}