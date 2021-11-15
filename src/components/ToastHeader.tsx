import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  icon?: any,
  wrapTag?: any,
  toggle?: (e?:any) => void,
  className?: string,
  children?: any,
  closeAriaLabel?: string,
  charCode?: string | number,
  close?: any,
};

const defaultProps = {
  tag: 'strong',
  wrapTag: 'div',
  tagClassName: 'me-auto',
  closeAriaLabel: 'Close',
  charCode: 215,
};

export const ToastHeader = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(defaultProps, props),
  ["className", "toggle", "wrapTag", "closeAriaLabel", "close", "tagClassName",
    "icon"]);

  const classes = () => classname(
    local.className,
    'toast-header'
  )

  const CloseBtn = () => <button type="button" onClick={local.toggle} class={'btn-close'} aria-label={local.closeAriaLabel} />

  const closeButton = () => !local.close && local.toggle ? CloseBtn() : null;

  const IconSvg = () => (
    <svg
      class={`rounded text-${local.icon}`}
      width="20"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect fill="currentColor" width="100%" height="100%"></rect>
    </svg>
  );

  const icon = () => typeof local.icon === "string" ? IconSvg() : local.icon

  const innerClass = () => classname(local.tagClassName, { "ms-2": icon() != null })

  return (
    <Dynamic component={local.wrapTag} {...attributes} class={classes()}>
      {icon}
      <Dynamic component={local.tag} class={innerClass}>
        {props.children}
      </Dynamic>
      {close || closeButton}
    </Dynamic>
  );
};