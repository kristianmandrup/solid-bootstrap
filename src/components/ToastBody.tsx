type PropTypes = {
  tag?: any,
  className?: string,
  innerRef?: any,
};

const defaultProps = {
  tag: 'div'
};

export const ToastBody = (props: PropTypes) => {
  const {
    className,
    innerRef,
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any
  const classes = [
    className,
    'toast-body'
  ]

  return (
    <Tag {...attributes} className={classes} ref={innerRef} />
  );
};