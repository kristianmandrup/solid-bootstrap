import 'solid-js/jsx-runtime'

type PropTypes = {
  tag?: any,
  'aria-label'?: string,
  className?: string,
  role?: string,
  size?: string,
  vertical?: boolean,
  children?: any
};

const defaultProps = {
  tag: 'div',
  role: 'group',
};

export const ButtonGroup = (props: PropTypes) => {
  const {
    className,
    size,
    vertical,
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;

  const classes = [
    className,
    size ? 'btn-group-' + size : false,
    vertical ? 'btn-group-vertical' : 'btn-group'
  ]

  return (
    <Tag {...attributes} className={classes} />
  );
};