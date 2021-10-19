type PropTypes = {
  tag?: any,
  className?: string,
};

const defaultProps = {
  tag: 'div',
};

export const OffcanvasBody = (props: PropTypes) => {
  const {
    className,
    tag: Tag,
    ...attributes } = {
    ...defaultProps,
    ...props
  } as any
  const classes = [
    className,
    'offcanvas-body'
  ];

  return (
    <Tag {...attributes} className={classes} />
  );
};