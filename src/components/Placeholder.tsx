import { Dynamic } from 'solid-js/web';
import { PropTypes as ColPropTypes, Col, getColumnClasses } from './Col';
import { classname } from './utils';

interface PropTypes extends ColPropTypes {
  color?: string,
  tag?: any,
  animation?: 'glow' | 'wave'
  innerRef?: any
  size?: 'lg' | 'sm' | 'xs'
};

const defaultProps = {
  tag: 'span'
};

export const Placeholder = (props: PropTypes) => {
  let {
    className,
    color,
    innerRef,
    tag,
    animation,
    size,
    widths,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  let { attributes: modifiedAttributes, colClasses } = getColumnClasses(attributes, widths)

  const classes = classname([
    className,
    colClasses,
    'placeholder' + (animation ? '-'+animation : ''),
    size ? 'placeholder-'+ size : false,
    color ? 'bg-'+color : false
  ])



  return (
    <Dynamic component={tag} {...modifiedAttributes} className={classes} ref={innerRef} />
  );
};