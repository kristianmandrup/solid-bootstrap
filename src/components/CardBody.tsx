import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  innerRef?: any
  children?: any
};

const defaultProps = {
  tag: 'div'
};

export const CardBody = (props: PropTypes) => {
  const {
    className,
    innerRef,
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;
  
  const classes = classname([
    className,
    'card-body'
  ])

  return (
    <Tag {...attributes} className={classes} ref={innerRef} />
  );
};
