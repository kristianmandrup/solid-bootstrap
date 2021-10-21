import 'solid-js/jsx-runtime'

type PropTypes = {
  children?: any,
  inline?: boolean,
  tag?: any,
  color?: string,
  className?: string,
};

const defaultProps = {
  tag: 'small',
  color: 'muted',
};

export const FormText = (props: PropTypes) => {
  const {
    className,
    inline,
    color,
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = [
    className,
    !inline ? 'form-text' : false,
    color ? `text-${color}` : false
  ]

  return (
    <Tag {...attributes} className={classes} />
  );
};