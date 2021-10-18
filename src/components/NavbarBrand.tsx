type PropTypes = {
  tag?: any,
  className?: string,
};

const defaultProps = {
  tag: 'a'
};

export const NavbarBrand = (props: PropTypes) => {
  const {
    className,
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = [
    className,
    'navbar-brand'
  ]

  return (
    <Tag {...attributes} className={classes} />
  );
};