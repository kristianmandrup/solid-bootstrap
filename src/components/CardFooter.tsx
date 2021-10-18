type PropTypes = {
  tag: any,
  className: string,
};

const defaultProps = {
  tag: 'div'
};

export const CardFooter = (props: PropTypes) => {
  const {
    className,
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;
  const classes = [
    className,
    'card-footer'
  ]

  return (
    <Tag {...attributes} className={classes} />
  );
};