import { TooltipPopoverWrapper, PropTypes } from './TooltipPopoverWrapper';

export { PropTypes }

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

  const classes = [
    'popover-inner',
    props.innerClassName
  ]

  props = {
    ...defaultProps,
    ...props
  } 


  return (
    <TooltipPopoverWrapper
      {...props}
      arrowClassName="popover-arrow"
      popperClassName={popperClasses}
      innerClassName={classes}
    />
  );
};