import { TooltipPopoverWrapper } from './TooltipPopoverWrapper';
import type { PropTypes } from './TooltipPopoverWrapper';
import { classname } from './utils';
import { mergeProps, splitProps } from 'solid-js';

export type { PropTypes }

const defaultProps = {
  placement: 'right',
  placementPrefix: 'bs-popover',
  trigger: 'click',
  offset: [0, 8]
};

export const Popover = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
  ["popperClassName", "innerClassName"]);

  const popperClasses = () => classname(
    'popover',
    'show',
    local.popperClassName
  )

  const classes = () => classname(
    'popover-inner',
    local.innerClassName
  )

  return (
    <TooltipPopoverWrapper
      {...attributes}
      arrowClassName="popover-arrow"
      popperclass={popperClasses()}
      innerclass={classes()}
    />
  );
};