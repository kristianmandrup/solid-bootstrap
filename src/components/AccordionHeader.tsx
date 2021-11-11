import { createEffect, createSignal, mergeProps, splitProps, useContext } from "solid-js";
import { Dynamic } from "solid-js/web";
import { AccordionContext } from "./AccordionContext";
import { classname, classnames } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
  ref?: any,
  children?: any,
  targetId: string,
};

const defaultProps = {
  tag: 'h2'
};

export const AccordionHeader = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(props, defaultProps),
    ["className", "tag", "targetId", "children"],
  );
  
  const [buttonClass, setButtonClass] = createSignal('')
  const [ open, { toggle } ] = useContext(AccordionContext);  

  const classes = classname(
    local.className,
    'accordion-header',
  )

  const buttonClasses = classnames(
    'accordion-button',
  )

  createEffect(() => {
    const collapsed = !(Array.isArray(open()) ? open().includes(local.targetId) : open() === local.targetId)
    collapsed && buttonClasses.push('collapsed')  
    const buttonClass = buttonClasses.join(' ')  
    setButtonClass(buttonClass)
  })

  const toggleTarget = () => {
    toggle(local.targetId)
  }
  return (
    <Dynamic component={local.tag} class={classes} {...attributes} ref={props.ref}>
      <button type="button" class={buttonClass()} onClick={toggleTarget}>
        {local.children}
      </button>
    </Dynamic>
  );
};