import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  active?: any,
  children?: any,
};

const defaultProps = {
  tag: 'span'
};

export const NavbarText = (props: PropTypes) => {
  const {
    className,
    active,
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = classname([
    className,
    'navbar-text'
  ])

  return (
    <Tag {...attributes} className={classes} />
  );
};