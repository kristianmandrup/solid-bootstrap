import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  active?: boolean,
  disabled?: boolean,
  color?: string,
  action?: boolean,
  className?: any,
  children?: any
};

const defaultProps = {
  tag: 'li'
};

const handleDisabledOnClick = (e?: any) => {
  e.preventDefault();
};

export const ListGroupItem = (props: PropTypes) => {
  const {
    className,
    cssModule,
    tag: Tag,
    active,
    disabled,
    action,
    color,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any
  const classes = classname([
    className,
    active ? 'active' : false,
    disabled ? 'disabled' : false,
    action ? 'list-group-item-action' : false,
    color ? `list-group-item-${color}` : false,
    'list-group-item'
  ])

  // Prevent click event when disabled.
  if (disabled) {
    attributes.onClick = handleDisabledOnClick;
  }
  return (
    <Tag {...attributes} className={classes} />
  );
};