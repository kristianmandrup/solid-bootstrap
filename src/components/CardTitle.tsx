import 'solid-js/jsx-runtime'

type PropTypes = {
  tag: any,
  className: string,
};

const defaultProps = {
  tag: 'div'
};

const CardTitle = (props: PropTypes) => {
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
    'card-title'
  ]

  return (
    <Tag {...attributes} className={classes} />
  );
};