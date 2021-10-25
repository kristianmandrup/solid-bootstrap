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
  let closeButton;
  let icon;
  const {
    className,
    children,
    toggle,
    tag,
    wrapTag,
    closeAriaLabel,
    close,
    tagClassName,
    icon: iconProp,
    ...attributes } = {
      ...defaultProps,
      ...props
    } as any

  const classes = classname([
    className,
    'toast-header'
  ])

  if (!close && toggle) {
    closeButton = (
      <button type="button" onClick={toggle} class={'btn-close'} aria-label={closeAriaLabel} />
    );
  }

  if (typeof iconProp === "string") {
    icon = (
      <svg
        class={`rounded text-${iconProp}`}
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect fill="currentColor" width="100%" height="100%"></rect>
      </svg>
    );
  } else if (iconProp) {
    icon = iconProp;
  }

  return (
    <Dynamic component={wrapTag} {...attributes} className={classes}>
      {icon}
      <Dynamic component={tag} class={[tagClassName, { "ms-2": icon != null }]}>
        {children}
      </Dynamic>
      {close || closeButton}
    </Dynamic>
  );
};