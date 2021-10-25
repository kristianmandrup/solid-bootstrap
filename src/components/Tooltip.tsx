import { TooltipPopoverWrapper } from './TooltipPopoverWrapper';
import type { PropTypes } from './TooltipPopoverWrapper';
import { classname } from './utils';

export type { PropTypes }

const defaultProps = {
  placement: 'top',
  autohide: true,
  placementPrefix: 'bs-tooltip',
  trigger: 'hover focus',
};

export const Tooltip = (props: PropTypes) => {
  const popperClasses = [
    'tooltip',
    'show',
    props.popperClassName
  ]

  const classes = classname(
    'tooltip-inner',
    props.innerClassName
  )
  props = {
    ...defaultProps,
    ...props
  } as any

  return (
    <TooltipPopoverWrapper
      {...props}
      arrowClassName="tooltip-arrow"
      popperclass={popperClasses}
      innerclass={classes}
    />
  );
};