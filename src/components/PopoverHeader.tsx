type PropTypes = {
  tag?: any,
  className?: string,
};

const defaultProps = {
  tag: 'h3'
};

export const PopoverHeader = (props: PropTypes) => {
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
    'popover-header'
  ]

  return (
    <Tag {...attributes} className={classes} />
  );
};