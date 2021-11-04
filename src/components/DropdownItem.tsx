import { mergeProps, splitProps, useContext } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { DropdownContext } from './DropdownContext';
import { classname, omit } from './utils';

type PropTypes = {
  children?: any,
  active?: boolean,
  disabled?: boolean,
  divider?: boolean,
  tag?: any,
  header?: boolean,
  onClick?: (e?: any) => void,
  className?: string,
  toggle?: boolean,
  text?: boolean
  href?: string
};

const defaultProps = {
  tag: 'button',
  toggle: true
};

export const DropdownItem = (props: PropTypes) => {
  const [state, { toggle } ] = useContext(DropdownContext) as any;

  const getRole = () => {
    if(state.menuRole === 'listbox') {
      return 'option'
    }
    return 'menuitem'
  }

  const onClick = (e?: any) => {
    const { disabled, header, divider, text } = props;
    if (disabled || header || divider || text) {
      e.preventDefault();
      return;
    }

    if (local.onClick) {
      local.onClick(e);      
    }

    if (togglers.toggle) {
      // passed down from context
      toggle(e);
    }
  }

  const tabIndex = () => {
    const { disabled, header, divider, text } = props;
    if (disabled || header || divider || text) {
      return -1;
    }

    return 0;
  }

  const role = () => tabIndex() > -1 ? getRole() : undefined;

  const [local, togglers, attributes] = splitProps(mergeProps(props, defaultProps),
  ["className", "disabled", "tag", "divider", "header", "active", "text", "onClick"],
  ["toggle"]);

  const classObj = () => ({
    disabled: local.disabled,
    'dropdown-item': !local.divider && !local.header && !local.text,
    active: local.active,
    'dropdown-header': local.header,
    'dropdown-divider': local.divider,
    'dropdown-item-text': local.text
  })

  const classes = () => classname(
    local.className,
    classObj()
  )

  const tag = () => {    
    if (local.tag !== 'button') return local.tag
    if (local.header) {
      return 'h6';
    } else if (local.divider) {
      return 'div';
    } else if (attributes.href) {
      return 'a';
    } else if (local.text) {
      return 'span';
    }
  }

  const type = () => (tag() === 'button' && (local.onClick || togglers.toggle)) ? 'button' : undefined

  return (
    <Dynamic component={tag()}
      type={type()}
      {...attributes}
      tabIndex={tabIndex()}
      role={role()}
      class={classes()}
      onClick={onClick}
    />
  );
}
