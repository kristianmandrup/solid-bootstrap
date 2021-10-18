type PropTypes = {
  tag?: any,
  className?: string,  
};

const defaultProps = {
  tag: 'div',
};

export const ModalFooter = (props: PropTypes) => {
  const {
    className,
    tag: Tag,
    ...attributes } = {
      ...defaultProps,
      ...props
    } as any
  const classes = [
    className,
    'modal-footer'
  ]

  return (
    <Tag {...attributes} className={classes} />
  );
};