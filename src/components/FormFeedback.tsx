import 'solid-js/jsx-runtime'

type PropTypes = {
  children?: any,
  tag?: any,
  className?: string,
  valid?: boolean,
  tooltip?: boolean
};

const defaultProps = {
  tag: 'div',
  valid: undefined
};

const FormFeedback = (props: PropTypes) => {
  const {
    className,
    valid,
    tooltip,
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const validMode = tooltip ? 'tooltip' : 'feedback';

  const classes = [
      className,
      valid ? `valid-${validMode}` : `invalid-${validMode}`
  ]

  return <Tag {...attributes} className={classes} />;
};