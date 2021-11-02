import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  children?: any,
  inline?: boolean,
  tag?: any,
  color?: string,
  className?: string,
};

const defaultProps = {
  tag: 'small',
  color: 'muted',
};

export const FormText = (props: PropTypes) => {
  const {
    className,
    inline,
    color,
    tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = classname(
    className,
    !inline ? 'form-text' : false,
    color ? `text-${color}` : false
  )

  return (
    <Dynamic 
      component={tag} 
      {...attributes} 
      class={classes}>
    {props.children}
    </Dynamic>
  );
};