import { DropdownContext } from './DropdownContext';
import { omit, keyCodes, classname } from './utils';
// import usePopper from 'solid-popper';
import { createSignal } from 'solid-js';

export type PropTypes = {
  a11y?: boolean,
  disabled?: boolean,
  direction?: 'up' | 'down' | 'start' | 'end' | 'left' | 'right'
  group?: boolean,
  isOpen?: boolean,
  nav?: boolean,
  active?: boolean,
  size?: string,
  tag?: any,
  toggle?: (e?: any) => void,
  children?: any,
  className?: string,
  inNavbar?: boolean,
  setActiveFromChild?: boolean,
  menuRole?: 'listbox' | 'menu'
  dropup?: boolean
};

const defaultProps = {
  a11y: true,
  isOpen: false,
  direction: 'down',
  nav: false,
  active: false,
  inNavbar: false,
  setActiveFromChild: false
};

const preventDefaultKeys = [
  keyCodes.space,
  keyCodes.enter,
  keyCodes.up,
  keyCodes.down,
  keyCodes.end,
  keyCodes.home
]



export const Dropdown = (props: PropTypes) => {
  props = {
    ...defaultProps,
    ...props
  } as any

  let containerRef: any;
  let menuRef: any;

  const getDirection = () => props.direction === 'down' && props.dropup ? 'up' : props.direction

  const getContainer = () => {
    return containerRef.current;
  }

  const getMenu = () => menuRef.current;

  const getMenuCtrl = ($menuCtrl?: any) => {
    if ($menuCtrl) return $menuCtrl;
    $menuCtrl = getContainer().querySelector('[aria-expanded]');
    return $menuCtrl;
  }
  
  const getItemType = (context?: any) => {
    if(context.menuRole === 'listbox') {
      return 'option'
    }
    return 'menuitem'
  }
  
  const getMenuItems = (): any[] => {
    // In a real menu with a child DropdownMenu, `getMenu()` should never
    // be null, but it is sometimes null in tests. To mitigate that, we just
    // use `getContainer()` as the fallback `menuContainer`.
    const menuContainer = getMenu() || getContainer();
    return [].slice.call(menuContainer.querySelectorAll(`[role="${getItemType()}"]`));
  }
  
  const addEvents = () => {
    ['click', 'touchstart', 'keyup'].forEach(event =>
      document.addEventListener(event, handleDocumentClick, true)
    );
  }
  
  const removeEvents = () => {
    ['click', 'touchstart', 'keyup'].forEach(event =>
      document.removeEventListener(event, handleDocumentClick, true)
    );
  }
  
  const handleDocumentClick = (e: any) => {
    if (e && (e.which === 3 || (e.type === 'keyup' && e.which !== keyCodes.tab))) return;
    const container = getContainer();
    const menu = getMenu();
    const clickIsInContainer = container.contains(e.target) && container !== e.target;
    const clickIsInInput = container.classList.contains('input-group') && container.classList.contains('dropdown') && e.target.tagName === 'INPUT';
    const clickIsInMenu = menu && menu.contains(e.target) && menu !== e.target;
    if (((clickIsInContainer && !clickIsInInput) || clickIsInMenu) && (e.type !== 'keyup' || e.which === keyCodes.tab)) {
      return;
    }
  
    toggle(e);
  }
  
  const handleKeyDown = (e: any) => {
    const isTargetMenuItem = e.target.getAttribute('role') === 'menuitem' || e.target.getAttribute('role') === 'option';
    const isTargetMenuCtrl = getMenuCtrl() === e.target;
    const isTab = keyCodes.tab === e.which;
  
    if (
      /input|textarea/i.test(e.target.tagName)
      || (isTab && !props.a11y)
      || (isTab && !(isTargetMenuItem || isTargetMenuCtrl))
    ) {
      return;
    }
  
    if (preventDefaultKeys.indexOf(e.which) !== -1 || ((e.which >= 48) && (e.which <= 90))) {
      e.preventDefault();
    }
  
    if (props.disabled) return;
  
    if (isTargetMenuCtrl) {
      if ([keyCodes.space, keyCodes.enter, keyCodes.up, keyCodes.down].indexOf(e.which) > -1) {
        // Open the menu (if not open) and focus the first menu item
        if (!props.isOpen) {
          toggle(e);
        }
        setTimeout(() => getMenuItems()[0].focus());
      } else if (props.isOpen && isTab) {
        // Focus the first menu item if tabbing from an open menu. We need this
        // for cases where the DropdownMenu sets a custom container, which may
        // not be the natural next item to tab to from the DropdownToggle.
        e.preventDefault();
        getMenuItems()[0].focus();
      } else if (props.isOpen && e.which === keyCodes.esc) {
        toggle(e);
      }
    }
  
    if (props.isOpen && isTargetMenuItem) {
      if ([keyCodes.tab, keyCodes.esc].indexOf(e.which) > -1) {
        toggle(e);
        getMenuCtrl().focus();
      } else if ([keyCodes.space, keyCodes.enter].indexOf(e.which) > -1) {
        e.target.click();
        getMenuCtrl().focus();
      } else if (
        [keyCodes.down, keyCodes.up].indexOf(e.which) > -1
        || ([keyCodes.n, keyCodes.p].indexOf(e.which) > -1 && e.ctrlKey)
      ) {
        const $menuitems = getMenuItems();
        let index = $menuitems.indexOf(e.target);
        if (keyCodes.up === e.which || (keyCodes.p === e.which && e.ctrlKey)) {
          index = index !== 0 ? index - 1 : $menuitems.length - 1;
        } else if (keyCodes.down === e.which || (keyCodes.n === e.which && e.ctrlKey)) {
          index = index === $menuitems.length - 1 ? 0 : index + 1;
        }
        $menuitems[index].focus();
      } else if (keyCodes.end === e.which) {
        const $menuitems = getMenuItems();
        $menuitems[$menuitems.length - 1].focus();
      } else if (keyCodes.home === e.which) {
        const $menuitems = getMenuItems();
        $menuitems[0].focus();
      } else if ((e.which >= 48) && (e.which <= 90)) {
        const $menuitems = getMenuItems();
        const charPressed = String.fromCharCode(e.which).toLowerCase();
        for (let i = 0; i < $menuitems.length; i += 1) {
          const firstLetter = $menuitems[i].textContent && $menuitems[i].textContent[0].toLowerCase();
          if (firstLetter === charPressed) {
            $menuitems[i].focus();
            break;
          }
        }
      }
    }
  }


  const handleProps = () => {
    if (props.isOpen) {
      addEvents();
    } else {
      removeEvents();
    }
  }

  const toggle = (e: any) => {
    if (props.disabled) {
      return e && e.preventDefault();
    }
    return props.toggle && props.toggle(e);
  }

  const {
    className,
    cssModule,
    direction,
    isOpen,
    group,
    size,
    nav,
    setActiveFromChild,
    active,
    tag,
    menuRole,
    ...attrs
  } = omit(props, ['toggle', 'disabled', 'inNavbar', 'a11y']);

  const Tag = tag || (nav ? 'li' : 'div');

  let subItemIsActive = false;
  if (setActiveFromChild) {
    props.children[1].props.children.map((dropdownItem: any) => {
        if (dropdownItem && dropdownItem.props.active) subItemIsActive = true;
      }
    );
  }

    const classes = classname([
      className,
      nav && active ? 'active' : false,
      setActiveFromChild && subItemIsActive ? 'active' : false,
      {
        'btn-group': group,
        [`btn-group-${size}`]: !!size,
        dropdown: !group,
        dropup: direction === 'up',
        dropstart: direction === 'start' || direction === 'left',
        dropend: direction === 'end' || direction === 'right',
        show: isOpen,
        'nav-item': nav
      }
    ])

    const handleMenuRef = (menuRef: any) => {
      menuRef.current = menuRef;
    }    

    const getContextValue = () => {
      return {
        toggle,
        isOpen: props.isOpen,
        direction: getDirection(),
        inNavbar: props.inNavbar,
        disabled: props.disabled,
        // Callback that should be called by DropdownMenu to provide a ref to
        // a HTML tag that's used for the DropdownMenu
        onMenuRef: handleMenuRef,
        menuRole: props.menuRole
      };
    }    

    const [value, setCtx] = createSignal(getContextValue()),
    store = [
      value(),
      {
        ctx() {
          setCtx(ctx => ctx);
        },
      }      
    ];    

    return (
      <DropdownContext.Provider value={store}>
          <Tag
            {...attrs}
            {...{ [typeof Tag === 'string' ? 'ref' : 'innerRef']: containerRef }}
            onKeyDown={handleKeyDown}
            className={classes}
          />
      </DropdownContext.Provider>
    );
  }
