import { PropTypes as ColPropTypes, Col, getColumnClasses } from './Col';

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
    tag: Tag,
    animation,
    size,
    widths,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  let { attributes: modifiedAttributes, colClasses } = getColumnClasses(attributes, widths)

  const classes = [
    className,
    colClasses,
    'placeholder' + (animation ? '-'+animation : ''),
    size ? 'placeholder-'+ size : false,
    color ? 'bg-'+color : false
  ]



  return (
    <Tag {...modifiedAttributes} className={classes} ref={innerRef} />
  );
};