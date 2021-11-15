import { createSignal, mergeProps, splitProps } from "solid-js";
import { Button } from "./Button";
import { classname } from "./utils";

type PropTypes = {
  onClick?: (e?: any) => void,
  onBlur?: (e?: any) => void,
  onFocus?: (e?: any) => void,
  defaultValue?: boolean,
  children?: any
  className?: string
};

const defaultProps = {
  defaultValue: false,
};

export const ButtonToggle = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
    ["className",  "defaultValue"]);

  const [toggled, setToggled] = createSignal(local.defaultValue)
  const [focused, setFocused] = createSignal(false)    

  const onBlur = (e?: any) => {
    props.onBlur && props.onBlur(e)
    setFocused(false);
  }

  const onFocus = (e?: any) => {
    if(props.onFocus) {
      props.onFocus(e);
    }

    setFocused(true)
  }

  const onClick = (e?: any) => {
    if(props.onClick) {
      props.onClick(e);
    }

    setToggled(!toggled())
  }

  const classes = () => classname(
    local.className, 
    { 
      focus: focused(), 
    }
  )

  return <Button
    active={toggled()}
    onBlur={onBlur} 
    onFocus={onFocus} 
    onClick={onClick}
    className={classes()}
    {...attributes}
  />
}
