import 'solid-js/jsx-runtime'

type PropTypes = {
  tag?: any,
  listTag?: any,
  className?: string,
  listClassName?: string,
  children?: any,
  'aria-label'?: string
};

const defaultProps = {
  tag: 'nav',
  listTag: 'ol',
  'aria-label': 'breadcrumb'
};

export const Breadcrumb = (props: PropTypes) => {
  const {
    className,
    listClassName,
    children,
    tag: Tag,
    listTag: ListTag,
    'aria-label': label,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;

  const classes = [
    className
  ];

  const listClasses = [
    'breadcrumb',
    listClassName
  ];

  return (
    <Tag {...attributes} className={classes} aria-label={label}>
      <ListTag className={listClasses}>
        {children}
      </ListTag>
    </Tag>
  );
};