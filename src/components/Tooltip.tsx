import { TooltipPopoverWrapper } from './TooltipPopoverWrapper';
import type { PropTypes } from './TooltipPopoverWrapper';
import { classname } from './utils';
import { mergeProps, splitProps } from 'solid-js';

export type { PropTypes }

const defaultProps = {
  placement: 'top',
  autohide: true,
  placementPrefix: 'bs-tooltip',
  trigger: 'hover focus',
};

export const Tooltip = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(props, defaultProps),
  ["popperClassName", "innerClassName"]);

  const popperClasses = () => [
    'tooltip',
    'show',
    local.popperClassName
  ]

  const classes = () => classname(
    'tooltip-inner',
    local.innerClassName
  )

  return (
    <TooltipPopoverWrapper
      {...attributes}
      arrowClassName="tooltip-arrow"
      popperclass={popperClasses()}
      innerclass={classes()}
    />
  );
};