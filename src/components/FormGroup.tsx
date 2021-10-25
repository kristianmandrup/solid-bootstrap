import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  children?: any,
  row?: boolean,
  check?: boolean,
  switch?: boolean,
  inline?: boolean,
  floating?: boolean,
  disabled?: boolean,
  tag?: any,
  className?: string,
};

const defaultProps = {
  tag: 'div',
};

export const FormGroup = (props: PropTypes) => {
  const {
    className,
    row,
    disabled,
    check,
    inline,
    floating,
    tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const formCheck = check || props.switch;

  const classes = classname([
    className,
    row ? 'row' : false,
    formCheck ? 'form-check' : 'mb-3',
    props.switch ? 'form-switch' : false,
    formCheck && inline ? 'form-check-inline' : false,
    formCheck && disabled ? 'disabled' : false,
    floating && 'form-floating'
  ])

  if (tag === 'fieldset') {
    attributes.disabled = disabled;
  }

  return (
    <Dynamic component={tag} {...attributes} class={classes} />
  );
};