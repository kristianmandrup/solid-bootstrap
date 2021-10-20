import 'solid-js/jsx-runtime'

type PropTypes = {
  tag: any,
  active: boolean,
  className: string,
};

const defaultProps = {
  tag: 'li'
};

export const BreadcrumbItem = (props: PropTypes) => {
  const {
    className,
    active,
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;
  const classes = [
    className,
    active ? 'active' : false,
    'breadcrumb-item'
  ]

  return (
    <Tag {...attributes} className={classes} aria-current={active ? 'page' : undefined} />
  );
};