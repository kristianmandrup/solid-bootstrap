type PropTypes = {
  tag?: any,
  type?: string,
  className?: string,
  children?: any,
  onClick?: (e?: any) => void
};

const defaultProps = {
  tag: 'button',
  type: 'button'
};

export const NavbarToggler = (props: PropTypes) => {
  const {
    className,
    children,
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = [
    className,
    'navbar-toggler'
  ]

  return (
    <Tag aria-label="Toggle navigation" {...attributes} className={classes}>
      {children || <span className={'navbar-toggler-icon'} />}
    </Tag>
  );
};