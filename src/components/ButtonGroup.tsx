import 'solid-js/jsx-runtime'

type PropTypes = {
  tag: any,
  'aria-label': string,
  className: string,
  role: string,
  size: string,
  vertical: boolean,
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
  } = props;

  const classes = [
    className,
    size ? 'btn-group-' + size : false,
    vertical ? 'btn-group-vertical' : 'btn-group'
  ]

  return (
    <Tag {...attributes} className={classes} />
  );
};