type PropTypes = {
  tag?: any,
  className?: string,
};

const defaultProps = {
  tag: 'div',
};

export const ModalBody = (props: PropTypes) => {
  const {
    className,
    tag: Tag,
    ...attributes } = {
      ...defaultProps,
      ...props
    } as any
  const classes = [
    className,
    'modal-body'
  ]

  return (
    <Tag {...attributes} className={classes} />
  );
};