import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  wrapTag?: any,
  toggle?: (e?: any) => void,
  className?: string,
  children?: any,
  closeAriaLabel?: string,
  close?: any,
};

const defaultProps = {
  tag: 'h5',
  wrapTag: 'div',
  closeAriaLabel: 'Close',
};

export const ModalHeader = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(defaultProps, props),
  ["className", "tag", "toggle", "wrapTag", "closeAriaLabel", "close", "children"]);
  
  const classes = () => classname(
    local.className,
    'modal-header'
  )

  const closeButton = () => <button type="button" onClick={local.toggle} class={'btn-close'} aria-label={local.closeAriaLabel} />

  const maybeCloseButton = () => {
    return !local.close && local.toggle ? closeButton() : undefined
  }

  return (
    <Dynamic component={local.wrapTag} {...attributes} class={classes()}>
      <Dynamic component={local.tag} class={'modal-title'}>
        {local.children}
      </Dynamic>
      {close || maybeCloseButton()}
    </Dynamic>
  );
};