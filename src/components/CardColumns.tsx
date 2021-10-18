import 'solid-js/jsx-runtime'

type PropTypes = {
  tag: any,
  className: string,
};

const defaultProps = {
  tag: 'div'
};

export const CardColumns = (props: PropTypes) => {
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
    'card-columns'
  ]

  return (
    <Tag {...attributes} className={classes} />
  );
};