import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  'aria-label'?: string,
  className?: string,
  role?: string,
};

const defaultProps = {
  tag: 'div',
  role: 'toolbar',
};

export const ButtonToolbar = (props: PropTypes) => {
  const {
    className,
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;

  const classes = classname([
    className,
    'btn-toolbar'
  ])

  return (
    <Tag {...attributes} className={classes} />
  );
};
