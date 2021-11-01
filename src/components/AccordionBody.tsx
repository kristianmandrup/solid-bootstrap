import { Collapse } from './Collapse';
import { AccordionContext } from './AccordionContext';
import { useContext } from 'solid-js';
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
    accordionId,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;

  const [state, _] = useContext(AccordionContext) as any;
  const { open } = state

  const classes = classname([
    className,
    'accordion-collapse',
  ])

  const isOpen = Array.isArray(open) ? open.includes(accordionId) : open === accordionId

  return (
    <Collapse
      {...attributes}
      class={classes}
      ref={innerRef} isOpen={isOpen}>
      <Dynamic component={tag} className="accordion-body">
        {props.children}
      </Dynamic>
    </Collapse>    
  );
};