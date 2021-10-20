import { Collapse } from './Collapse';
import { AccordionContext } from './AccordionContext';
import { useContext } from 'solid-js';

type PropTypes = {
  tag?: any,
  className?: string,
  innerRef?: any,
  children?: any,
  accordionId: string,
};

const defaultProps = {
  tag: 'div'
};

export const AccordionBody = (props: PropTypes) => {
  const {
    className,
    tag: Tag,
    innerRef,
    children,
    accordionId,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;

  const { open } = useContext(AccordionContext) as any;

  const classes = [
    className,
    'accordion-collapse',
  ]

  return (
    <Collapse
      {...attributes}
      className={classes}
      ref={innerRef} isOpen={Array.isArray(open) ? open.includes(accordionId) : open === accordionId }>
      <Tag className="accordion-body">{children}</Tag>
    </Collapse>    
  );
};