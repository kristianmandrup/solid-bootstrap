import 'solid-js/jsx-runtime'

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
  const classes = [
    className,
    'accordion-item',
  ]

  return (
    <Tag {...attributes} className={classes} ref={innerRef} />
  );
};