import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  innerRef?: any,
  children?: any,
};

const defaultProps = {
  tag: 'div'
};

export const AccordionItem = (props: PropTypes) => {
  const {
    className,
    tag: Tag,
    innerRef,
    ...attributes
  } = props;
  const classes = classname([
    className,
    'accordion-item',
  ])

  return (
    <Tag {...attributes} className={classes} ref={innerRef} />
  );
};