import { Collapse } from './Collapse';
import { AccordionContext } from './AccordionContext';
import { Component, useContext } from 'solid-js';
import { classname } from './utils';
import { Dynamic } from 'solid-js/web';

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
    tag,
    innerRef,
    children,
    accordionId,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;

  const { open } = useContext(AccordionContext) as any;

  const classes = classname([
    className,
    'accordion-collapse',
  ])

  return (
    <Collapse
      {...attributes}
      class={classes}
      ref={innerRef} isOpen={Array.isArray(open) ? open.includes(accordionId) : open === accordionId }>
      <Dynamic component={tag} className="accordion-body">{children}</Dynamic>
    </Collapse>    
  );
};