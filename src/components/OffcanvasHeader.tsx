import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  children?: any,
  className?: string,
  close?: object,
  closeAriaLabel?: string,
  tag?: any,
  toggle?: (e?:any) => void,
  wrapTag?: any
};

const defaultProps = {
  closeAriaLabel: 'Close',
  tag: 'h5',
  wrapTag: 'div'
};

export const OffcanvasHeader = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(props, defaultProps),
  ["className", "tag", "close", "closeAriaLabel", "toggle", "wrapTag", "children"]);

  const classes = () => classname(
    local.className,
    'offcanvas-header'
  );

  const CloseBtn = () => <button type="button" onClick={local.toggle} class={'btn-close'} aria-label={local.closeAriaLabel} />
  const closeButton = () => (!close && local.toggle) ? CloseBtn() : null
  
  return (
    <Dynamic component={local.wrapTag} {...attributes} class={classes}>
      <Dynamic component={local.tag} class={'offcanvas-title'}>
        {local.children}
      </Dynamic>
      {close || closeButton()}
    </Dynamic>
  );
};