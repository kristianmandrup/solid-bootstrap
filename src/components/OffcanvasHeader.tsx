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
  let closeButton;
  const {
    children,
    className,
    close,
    closeAriaLabel,
    tag,
    toggle,
    wrapTag: WrapTag,
    ...attributes } = {
      ...defaultProps,
      ...props
    } as any

  const classes = classname([
    className,
    'offcanvas-header'
  ]);

  if (!close && toggle) {
    closeButton = (
      <button type="button" onClick={toggle} class={'btn-close'} aria-label={closeAriaLabel} />
    );
  }

  return (
    <WrapTag {...attributes} className={classes}>
      <Dynamic component={tag} className={'offcanvas-title'}>
        {children}
      </Dynamic>
      {close || closeButton}
    </WrapTag>
  );
};