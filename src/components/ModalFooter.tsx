import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  children?: any  
};

const defaultProps = {
  tag: 'div',
};

export const ModalFooter = (props: PropTypes) => {
  const {
    className,
    tag: Tag,
    ...attributes } = {
      ...defaultProps,
      ...props
    } as any
  const classes = classname([
    className,
    'modal-footer'
  ])

  return (
    <Tag {...attributes} className={classes} />
  );
};