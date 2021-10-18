import { useContext } from "solid-js";
import { AccordionContext } from "./AccordionContext";

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

const AccordionHeader = (props: PropTypes) => {
  const {
    className,
    tag: Tag,
    innerRef,
    children,
    targetId,
    ...attributes
  } = props;
  const { open, toggle } = useContext(AccordionContext) as any;

  const classes = [
    className,
    'accordion-header',
  ]

  const buttonClasses = [
    'accordion-button',
  ]

  const collapsed = !(Array.isArray(open) ? open.includes(targetId) : open === targetId)
  collapsed && buttonClasses.push('collapsed')  

  return (
    <Tag {...attributes} className={classes} ref={innerRef}>
      <button type="button" className={buttonClasses.join(' ')} onClick={() => toggle(targetId)}>
        {children}
      </button>
    </Tag>
  );
};