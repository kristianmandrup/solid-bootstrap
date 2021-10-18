import usePopper from 'solid-popper';
import { DropdownContext } from './DropdownContext';
import { Button } from './Button';
import { useContext } from 'solid-js';

type PropTypes = {
  caret?: boolean,
  color?: string,
  children?: any,
  className?: string,
  disabled?: boolean,
  onClick?: (e?:any) => void,
  'aria-haspopup': boolean,
  split?: boolean,
  tag?: any,
  nav?: boolean,
};

const defaultProps = {
  color: 'secondary',
  'aria-haspopup': true
};

const Reference = ({children, ...props}: any) => <>{children}</>

export const DropdownToggle = (props: PropTypes) => {
  const context = useContext(DropdownContext) as any;

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

    context.toggle(e);
  }

  const getRole = () => {
    return context.menuRole || props['aria-haspopup'];
  }

  const { className, color, cssModule, caret, split, nav, tag, innerRef, ...properties } = {
    ...defaultProps,
    ...props
  } as any
  const ariaLabel = properties['aria-label'] || 'Toggle Dropdown';
  const classes = [
    className,
    {
      'dropdown-toggle': caret || split,
      'dropdown-toggle-split': split,
      'nav-link': nav
    }
  ]
  const children =
    typeof props.children !== 'undefined' ? (
      props.children
    ) : (
      <span className="visually-hidden">{ariaLabel}</span>
    );

    let Tag: any;

    if (nav && !tag) {
      Tag = 'a';
      properties.href = '#';
    } else if (!tag) {
      Tag = Button;
      props.color = color;
    } else {
      Tag = tag;
    }

    if (context.inNavbar) {
      return (
        <Tag
          {...props}
          className={classes}
          onClick={onClick}
          aria-expanded={context.isOpen}
          aria-haspopup={getRole()}
          children={children}
        />
      );
    }

    return (
      <Reference innerRef={innerRef}>
        {({ ref }: any) => (
          <Tag
            {...props}
            {...{ [typeof Tag === 'string' ? 'ref' : 'innerRef']: ref }}

            className={classes}
            onClick={onClick}
            aria-expanded={context.isOpen}
            aria-haspopup={getRole()}
            children={children}
          />
        )}
      </Reference>
    );
  }
