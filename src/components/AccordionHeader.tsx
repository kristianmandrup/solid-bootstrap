import { useContext } from "solid-js";
import { Dynamic } from "solid-js/web";
import { AccordionContext } from "./AccordionContext";
import { classname, classnames } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  innerRef?: any,
  children?: any,
  targetId: string,
};

const defaultProps = {
  tag: 'h2'
};

export const AccordionHeader = (props: PropTypes) => {
  let {
    className,
    tag,
    innerRef,
    children,
    targetId,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;
  
  const [ state, { toggle } ] = useContext(AccordionContext) as any;
  const { open } = state

  const classes = classname([
    className,
    'accordion-header',
  ])

  const buttonClasses = classnames([
    'accordion-button',
  ])

  const collapsed = !(Array.isArray(open) ? open.includes(targetId) : open === targetId)
  collapsed && buttonClasses.push('collapsed')  

  const buttonClass = buttonClasses.join(' ')

  return (
    <Dynamic component={tag} {...attributes} class={classes} ref={innerRef}>
      <button type="button" class={buttonClass} onClick={() => toggle(targetId)}>
        {children}
      </button>
    </Dynamic>
  );
};