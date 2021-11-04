import { DropdownContext } from './DropdownContext';
import { Button } from './Button';
import { mergeProps, splitProps, useContext } from 'solid-js';
import { classname } from './utils';
import { Dynamic } from 'solid-js/web';
import { Reference } from '../popper/Reference';

type PropTypes = {
  caret?: boolean,
  color?: string,
  children?: any,
  className?: string,
  disabled?: boolean,
  onClick?: (e?:any) => void,
  'aria-haspopup'?: boolean,
  split?: boolean,
  tag?: any,
  nav?: boolean,
  ref?: any,
  'aria-label'?: string
  href?: string
};

const defaultProps = {
  color: 'secondary',
  'aria-haspopup': true
};

export const DropdownToggle = (props: PropTypes) => {
  // The DropdownContext is setup in Dropdown as follows
  // and made available via Provider
  // --------------------------------------
  // const getStoreValue = () => {
  //   return {
  //     // toggle,
  //     isOpen: local.isOpen,
  //     direction: getDirection(),
  //     inNavbar: local.inNavbar,
  //     disabled: local.disabled,
  //     // Callback that should be called by DropdownMenu to provide a ref to
  //     // a HTML tag that's used for the DropdownMenu
  //     // onMenuRef: handleMenuRef,
  //     menuRole: local.menuRole
  //   };
  // }    

  // const [state, setState] = createStore(getStoreValue()),
  // store = [
  //   state,
  //   {
  //     onMenuRef(e?: any) {
  //       handleMenuRef(e)
  //     },          
  //     toggle(e?: any) {
  //       toggle(e)
  //     },
  //     setState,
  //   }      
  // ];   
  const [context, { toggle }] = useContext(DropdownContext);

  const onClick = (e?:any) => {
    if (local.disabled || context.disabled) {
      e.preventDefault();
      return;
    }

    if (local.nav && !local.tag) {
      e.preventDefault();
    }

    if (local.onClick) {
      local.onClick(e);
    }

    toggle && toggle(e);
  }

  const getRole = () => {
    return context.menuRole || props['aria-haspopup'];
  }

  const [local, attributes] = splitProps(mergeProps(props, defaultProps),
  ["className", "tag", "color", "caret", "split", "nav", "ref", "disabled", "onClick", "children"
  ])

  const ariaLabel = attributes['aria-label'] || 'Toggle Dropdown';
  const classObj = {
    'dropdown-toggle': local.caret || local.split,
    'dropdown-toggle-split': local.split,
    'nav-link': local.nav
  }

  const classes = () => classname(
    local.className,
    classObj
  )
  const children =
    typeof local.children !== 'undefined' ? (
      local.children
    ) : (
      <span className="visually-hidden">{ariaLabel}</span>
    );

  const tag = (): any => {
    if (local.nav && !local.tag) {
      attributes.href = '#';
      return tag
    } else if (!tag) {
      return Button(props)
    } else {
      return tag;
    }
  }

  if (context.inNavbar) {
    return (
      <Dynamic component={tag()}
        {...attributes}
        class={classes}
        onClick={onClick}
        aria-expanded={context.isOpen}
        aria-haspopup={getRole()}
        children={children}
      />
    );
  }

  return (
    <Reference innerRef={local.ref}>
      {({ ref }: any) => {
        const nodeRefKey = typeof tag === 'string' ? 'ref' : 'innerRef'
        const nodeRefObj = {[nodeRefKey]: ref}
        return <Dynamic component={tag}
          {...props}
          {...nodeRefObj}
          class={classes}
          onClick={onClick}
          aria-expanded={context.isOpen}
          aria-haspopup={getRole()}
        >
          {local.children}
        </Dynamic>
      }}
    </Reference>
  );
}
