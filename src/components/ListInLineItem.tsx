import { Dynamic } from "solid-js/web";
import { classname, classnames } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  ref: string
};

const defaultProps ={
  tag: 'li'
};

export const ListInlineItem = (props: PropTypes) => {
  const {
    className,
    ref,
    tag,
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
    <Dynamic component={tag} {...attributes} className={classes} ref={ref} />
  );
}