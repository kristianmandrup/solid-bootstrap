import { createSignal } from "solid-js";
import { Button } from "./Button";

type PropTypes = {
  onClick: (e?: any) => void,
  onBlur: (e?: any) => void,
  onFocus: (e?: any) => void,
  defaultValue: boolean,
};

const defaultProps = {
  defaultValue: false,
};

const ButtonToggle = (props: PropTypes) => {
    const [toggled, setToggled] = createSignal(props.defaultValue)
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

    setToggled(!toggled)
  }

    const {
      className,
      ...attributes
    } = {
      ...defaultProps,
      ...props
    } as any;

    const classes = [
      className, 
      { 
        focus: focused, 
      }
    ]

    return <Button
      active={toggled}
      onBlur={onBlur} 
      onFocus={onFocus} 
      onClick={onClick}
      className={classes}
      {...attributes}
    />;
  }
