import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
};

const defaultProps = {
  tag: 'div'
};

export const CardGroup = (props: PropTypes) => {
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
    'card-group'
  ])

  return (
    <Tag {...attributes} className={classes} />
  );
};