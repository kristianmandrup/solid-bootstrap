import usePopper from 'solid-popper';
import { DropdownContext } from './DropdownContext';
import { Button } from './Button';
import { useContext } from 'solid-js';
import { classname } from './utils';
import { Dynamic } from 'solid-js/web';

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

const Reference = ({children, ...props}: any) => <>{children}</>

export const DropdownToggle = (props: PropTypes) => {
  // TODO: fix
  const [context, { toggle }] = useContext(DropdownContext) as any;

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

    toggle(e);
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
  const classes = classname([
    className,
    {
      'dropdown-toggle': caret || split,
      'dropdown-toggle-split': split,
      'nav-link': nav
    }
  ])
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
        {({ ref }: any) => (
          <Dynamic component={tag}
            {...props}
            {...{ [typeof tag === 'string' ? 'ref' : 'innerRef']: ref }}

            class={classes}
            onClick={onClick}
            aria-expanded={context.isOpen}
            aria-haspopup={getRole()}
            children={children}
          />
        )}
      </Reference>
    );
  }
