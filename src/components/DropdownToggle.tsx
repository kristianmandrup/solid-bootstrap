import { DropdownContext } from './DropdownContext';
import { Button } from './Button';
import { useContext } from 'solid-js';
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
  //     isOpen: props.isOpen,
  //     direction: getDirection(),
  //     inNavbar: props.inNavbar,
  //     disabled: props.disabled,
  //     // Callback that should be called by DropdownMenu to provide a ref to
  //     // a HTML tag that's used for the DropdownMenu
  //     // onMenuRef: handleMenuRef,
  //     menuRole: props.menuRole
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
    if (props.disabled || context.disabled) {
      e.preventDefault();
      return;
    }

    if (props.nav && !props.tag) {
      e.preventDefault();
    }

    if (props.onClick) {
      props.onClick(e);
    }

    toggle && toggle(e);
  }

  const getRole = () => {
    return context.menuRole || props['aria-haspopup'];
  }

  props = {
    ...defaultProps,
    ...props
  }

  const { className, color, caret, split, nav, innerRef, ...properties } = props as any
  const ariaLabel = properties['aria-label'] || 'Toggle Dropdown';
  const classObj = {
    'dropdown-toggle': caret || split,
    'dropdown-toggle-split': split,
    'nav-link': nav
  }

  const classes = classname(
    className,
    classObj
  )
  const children =
    typeof props.children !== 'undefined' ? (
      props.children
    ) : (
      <span className="visually-hidden">{ariaLabel}</span>
    );

  let { tag } = props

  if (nav && !tag) {
    tag = 'a';
    properties.href = '#';
  } else if (!tag) {
    tag = Button;
    props.color = color;
  } else {
    tag = tag;
  }

  if (context.inNavbar) {
    return (
      <Dynamic component={tag}
        {...props}
        class={classes}
        onClick={onClick}
        aria-expanded={context.isOpen}
        aria-haspopup={getRole()}
        children={children}
      />
    );
  }

  return (
    <Reference innerRef={innerRef}>
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
          {props.children}
        </Dynamic>
      }}
    </Reference>
  );
}
