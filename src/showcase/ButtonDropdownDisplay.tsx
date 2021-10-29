import { createSignal } from 'solid-js';
import { ButtonDropdown, DropdownToggle } from '../components'

export default () => {
  const [dropdownOpen, setOpen] = createSignal(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
  <div>
    <a href="https://reactstrap.github.io/?path=/docs/components-button--button-dropdown">Button Dropdown docs</a>    
    <ButtonDropdown isOpen={dropdownOpen()} toggle={toggle}>
      <DropdownToggle caret>
        Button Dropdown
      </DropdownToggle>
    </ButtonDropdown>
  </div>
  )
}