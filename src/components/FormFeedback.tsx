import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type FormFeedbackPropTypes = {
  children?: any,
  tag?: any,
  className?: string,
  valid?: boolean,
  tooltip?: boolean
};

const defaultProps = {
  tag: 'div',
  valid: undefined
};

export const FormFeedback = (props: FormFeedbackPropTypes) => {
  const {
    className,
    valid,
    tooltip,
    tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const validMode = tooltip ? 'tooltip' : 'feedback';

  const classes = classname(
      className,
      valid ? `valid-${validMode}` : `invalid-${validMode}`
  )

  return <Dynamic component={tag} {...attributes} class={classes}>
    {props.children}
  </Dynamic>
};