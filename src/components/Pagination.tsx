import 'solid-js/jsx-runtime'

type PropTypes = {
  children?: any,
  className?: string,
  listClassName?: string,
  size?: string,
  tag?: any,
  listTag?: any,
  'aria-label'?: string
};

const defaultProps = {
  tag: 'nav',
  listTag: 'ul',
  'aria-label': 'pagination'
};

export const Pagination = (props: PropTypes) => {
  const {
    className,
    listClassName,
    size,
    tag: Tag,
    listTag: ListTag,
    'aria-label': label,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = [
    className
  ];

  const listClasses = [
    listClassName,
    'pagination',
    {
      [`pagination-${size}`]: !!size,
    }
  ];

  return (
    <Tag className={classes} aria-label={label}>
      <ListTag {...attributes} className={listClasses} />
    </Tag>
  );
};