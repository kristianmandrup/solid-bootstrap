import { useContext } from "solid-js";
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
  const {
    className,
    tag: Tag,
    innerRef,
    children,
    targetId,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;
  const { open, toggle } = useContext(AccordionContext) as any;

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
    <Tag {...attributes} className={classes} ref={innerRef}>
      <button type="button" className={buttonClass} onClick={() => toggle(targetId)}>
        {children}
      </button>
    </Tag>
  );
};