import { mergeProps, splitProps } from "solid-js";
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
  const [local, attributes] = splitProps(mergeProps(props, defaultProps),
  ["className", "tag", "valid", "tooltip"]);

  const validMode = () => local.tooltip ? 'tooltip' : 'feedback';

  const classes = () => {
     const mode = validMode()
     return classname(
      local.className,
      local.valid ? `valid-${mode}` : `invalid-${mode}`
    )
  }

  return <Dynamic component={local.tag} {...attributes} class={classes()}>
    {props.children}
  </Dynamic>
};