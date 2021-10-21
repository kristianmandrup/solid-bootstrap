import 'solid-js/jsx-runtime'

type PropTypes = {
  tag?: any,
  className?: string,
  children?: any
};

const defaultProps = {
  tag: 'p'
};

export const CardText = (props: PropTypes) => {
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
    'card-text'
  ]

  return (
    <Tag {...attributes} className={classes} />
  );
};