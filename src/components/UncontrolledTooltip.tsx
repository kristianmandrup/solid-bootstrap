import { createSignal } from 'solid-js';
import {Tooltip, PropTypes as TooltipPropTypes } from './Tooltip';
import { omit } from './utils';

interface PropTypes extends TooltipPropTypes {
  defaultOpen: boolean,
};

const omitKeys = ['defaultOpen'];

export const UncontrolledTooltip = (props: PropTypes) => {
  const [isOpen, setOpen] = createSignal(props.defaultOpen || false)

  const toggle = () => {
    setOpen(!isOpen());
  }

    return <Tooltip isOpen={isOpen()} toggle={toggle} {...omit(props, omitKeys)} />;
}

