import { TooltipPopoverWrapper } from './TooltipPopoverWrapper';
import type { PropTypes } from './TooltipPopoverWrapper';
import { classname } from './utils';

export type { PropTypes }

const defaultProps = {
  placement: 'right',
  placementPrefix: 'bs-popover',
  trigger: 'click',
  offset: [0, 8]
};

export const Popover = (props: PropTypes) => {
  const popperClasses = [
    'popover',
    'show',
    props.popperClassName
  ]

  const classes = classname(
    'popover-inner',
    props.innerClassName
  )

  props = {
    ...defaultProps,
    ...props
  } 


  return (
    <TooltipPopoverWrapper
      {...props}
      arrowClassName="popover-arrow"
      popperclass={popperClasses}
      innerclass={classes}
    />
  );
};