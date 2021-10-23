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
  let closeButton;
  const {
    className,
    children,
    toggle,
    tag,
    wrapTag: WrapTag,
    closeAriaLabel,
    close,
    ...attributes } = {
      ...defaultProps,
      ...props
    } as any

  const classes = classname([
    className,
    'modal-header'
  ])

  if (!close && toggle) {
    closeButton = (
      <button type="button" onClick={toggle} className={'btn-close'} aria-label={closeAriaLabel} />
    );
  }

  return (
    <WrapTag {...attributes} className={classes}>
      <Dynamic component={tag} className={'modal-title'}>
        {children}
      </Dynamic>
      {close || closeButton}
    </WrapTag>
  );
};