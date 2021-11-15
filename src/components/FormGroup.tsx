import { mergeProps, splitProps } from "solid-js";
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
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
  ["className", "tag", "row", "disabled", "check", "inline", "floating"]);

  const classes = () => {
    const check = local.check || attributes.switch

    return classname(
      local.className,
      local.row ? 'row' : false,
      check ? 'form-check' : 'mb-3',
      attributes.switch ? 'form-switch' : false,
      check && local.inline ? 'form-check-inline' : false,
      check && local.disabled ? 'disabled' : false,
      local.floating && 'form-floating'
    )
  }

  const disabled = () => local.tag === 'fieldset' ? local.disabled : undefined

  return (
    <Dynamic component={local.tag} {...attributes} class={classes()} disabled={disabled()} />
  );
};