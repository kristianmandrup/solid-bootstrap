type PropTypes = {
  tag?: any,
  active?: boolean,
  className?: string,
  children?: any,
};

const defaultProps = {
  tag: 'li'
};

export const NavItem = (props: PropTypes) => {
  const {
    className,
    active,
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = [
    className,
    'nav-item',
    active ? 'active' : false
  ]

  return (
    <Tag {...attributes} className={classes} />
  );
};