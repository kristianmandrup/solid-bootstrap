import { createSignal, mergeProps, splitProps } from 'solid-js';
import {Tooltip, PropTypes as TooltipPropTypes } from './Tooltip';
import { omit } from './utils';

interface PropTypes extends TooltipPropTypes {
  defaultOpen: boolean,
};

const defaultProps = {}

export const UncontrolledTooltip = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(defaultProps, props),
  ["defaultOpen"]);

  const [isOpen, setOpen] = createSignal(local.defaultOpen || false)

  const toggle = () => {
    setOpen(!isOpen());
  }

    return <Tooltip isOpen={isOpen()} toggle={toggle} {...attributes} />;
}

