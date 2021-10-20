import 'solid-js/jsx-runtime'

type PropTypes = {
  tag?: any,
  className?: string,
};

const defaultProps = {
  tag: 'div'
};

export const CardGroup = (props: PropTypes) => {
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
    'card-group'
  ]

  return (
    <Tag {...attributes} className={classes} />
  );
};