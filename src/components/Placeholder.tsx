import { mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { PropTypes as ColPropTypes, Col, getColumnClasses } from './Col';
import { classname } from './utils';

interface PropTypes extends ColPropTypes {
  color?: string,
  tag?: any,
  animation?: 'glow' | 'wave'
  ref?: any
  size?: 'lg' | 'sm' | 'xs'
};

const defaultProps = {
  tag: 'span'
};

export const Placeholder = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(props, defaultProps),
  ["className", "tag", "color", "animation", "size", "widths"]);

  const modifiedAttributes = () => getColumnClasses(attributes, local.widths).attributes

  const classes = () => {
    const { colClasses } = getColumnClasses(attributes, local.widths)
    return classname(
      local.className,
      colClasses,
      'placeholder' + (local.animation ? '-'+ local.animation : ''),
      local.size ? 'placeholder-' + local.size : false,
      local.color ? 'bg-' + local.color : false
    )
  }

  return (
    <Dynamic 
      component={local.tag} 
      {...modifiedAttributes()} 
      class={classes()} 
      ref={props.ref}/>
  );
};