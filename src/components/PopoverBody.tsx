import 'solid-js/jsx-runtime'

type PropTypes = {
  tag?: any,
  className?: string,
  children?: any
};

const defaultProps = {
  tag: 'div'
};

export const PopoverBody = (props: PropTypes) => {
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
    'popover-body'
  ]

  return (
    <Tag {...attributes} className={classes} />
  );
};