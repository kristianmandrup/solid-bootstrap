import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  type?: string
  ref?: any
  children?: any
};

const defaultProps ={
  tag: 'ul'
};

export const List = (props: PropTypes) => {
  const {
    className,
    tag: Tag,
    type,
    ref,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any
  const classes = classname([
    className,
    type ? `list-${type}` : false
  ])

  return (
    <Tag {...attributes} className={classes} ref={ref} />
  );
}