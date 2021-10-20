import { TooltipPopoverWrapper, PropTypes as TooltipPopoverWrapperPropTypes } from './TooltipPopoverWrapper';

const defaultProps = {
  placement: 'top',
  autohide: true,
  placementPrefix: 'bs-tooltip',
  trigger: 'hover focus',
};

export const Tooltip = (props: TooltipPopoverWrapperPropTypes) => {
  const popperClasses = [
    'tooltip',
    'show',
    props.popperClassName
  ]

  const classes = [
    'tooltip-inner',
    props.innerClassName
  ]
  props = {
    ...defaultProps,
    ...props
  } as any

  return (
    <TooltipPopoverWrapper
      {...props}
      arrowClassName="tooltip-arrow"
      popperClassName={popperClasses}
      innerClassName={classes}
    />
  );
};