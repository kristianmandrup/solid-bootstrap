import { Collapse } from './Collapse';
import { AccordionContext } from './AccordionContext';
import { createEffect, createSignal, mergeProps, splitProps, useContext } from 'solid-js';
import { classname } from './utils';
import { Dynamic } from 'solid-js/web';

type PropTypes = {
  tag?: any,
  className?: string,
  ref?: any,
  children?: any,
  accordionId: string,
};

const defaultProps = {
  tag: 'div'
};

export const AccordionBody = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
    ["className", "tag", "accordionId", "children"],
  );

  const [open, _] = useContext(AccordionContext) as any;
  const [isOpen, setIsOpen] = createSignal(false)

  const classes = classname(
    local.className,
    'accordion-collapse',
  )

  createEffect(() => {
    const isOpen = Array.isArray(open()) ? open().includes(local.accordionId) : open === local.accordionId
    setIsOpen(isOpen)
  })

  return (
    <Collapse
      {...attributes}
      className={classes}
      ref={props.ref} isOpen={isOpen()}>
      <Dynamic component={local.tag} className="accordion-body">
        {local.children}
      </Dynamic>
    </Collapse>    
  );
};