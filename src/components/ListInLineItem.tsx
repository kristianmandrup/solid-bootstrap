import { classname, classnames } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  ref: string
};

const defaultProps ={
  tag: 'li'
};

const ListInlineItem = (props: PropTypes) => {
  const {
    className,
    ref,
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any
  const classes = classname([
    className,
    'list-inline-item'
  ])

  return (
    <Tag {...attributes} className={classes} ref={ref} />
  );
}