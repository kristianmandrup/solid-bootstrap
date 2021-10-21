type PropTypes = {
  tag?: any,
  innerRef?: any,
  disabled?: boolean,
  active?: boolean,
  className?: string,
  onClick?: (e?: any) => void,
  href?: any,
  children?: any,
};

const defaultProps = {
  tag: 'a',
};

export const NavLink = (props: PropTypes) => {
  const onClick = (e?: any) => {
    if (props.disabled) {
      e.preventDefault();
      return;
    }

    if (props.href === '#') {
      e.preventDefault();
    }

    if (props.onClick) {
      props.onClick(e);
    }
  }

  let {
    className,
    cssModule,
    active,
    tag: Tag,
    innerRef,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = [
    className,
    'nav-link',
    {
      disabled: attributes.disabled,
      active: active
    }
  ]

  return (
    <Tag {...attributes} ref={innerRef} onClick={onClick} className={classes} />
  );
}