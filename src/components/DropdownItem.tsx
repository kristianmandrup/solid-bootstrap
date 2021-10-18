import { useContext } from 'solid-js';
import { DropdownContext } from './DropdownContext';
import { omit } from './utils';

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
};

const defaultProps = {
  tag: 'button',
  toggle: true
};

export const DropdownItem = (props: PropTypes) => {
  const context = useContext(DropdownContext) as any;

  const getRole = () => {
    if(context.menuRole === 'listbox') {
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

    if (props.onClick) {
      props.onClick(e);
    }

    if (props.toggle) {
      context.toggle(e);
    }
  }

  const getTabIndex = () => {
    const { disabled, header, divider, text } = props;
    if (disabled || header || divider || text) {
      return -1;
    }

    return 0;
  }

  const tabIndex = getTabIndex();
  const role = tabIndex > -1 ? getRole() : undefined;
  let {
    className,
    cssModule,
    divider,
    tag: Tag,
    header,
    active,
    text,
    ...properties } = omit(props, ['toggle']);

    const classes = [
      className,
      {
        disabled: props.disabled,
        'dropdown-item': !divider && !header && !text,
        active: active,
        'dropdown-header': header,
        'dropdown-divider': divider,
        'dropdown-item-text': text
      }
    ]

    if (Tag === 'button') {
      if (header) {
        Tag = 'h6';
      } else if (divider) {
        Tag = 'div';
      } else if (properties.href) {
        Tag = 'a';
      } else if (text) {
        Tag = 'span';
      }
    }

    return (
      <Tag
        type={(Tag === 'button' && (props.onClick || properties.toggle)) ? 'button' : undefined}
        {...props}
        tabIndex={tabIndex}
        role={role}
        className={classes}
        onClick={onClick}
      />
    );
  }