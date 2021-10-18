import 'solid-js/jsx-runtime'

type PropTypes = {
  tag?: any,
  className?: string,
};

const defaultProps = {
  tag: 'span'
};

const InputGroupText = (props: PropTypes) => {
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
    'input-group-text'
  ]

  return (
    <Tag {...attributes} className={classes} />
  );
}

