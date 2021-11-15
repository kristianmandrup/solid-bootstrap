import { mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import {Dropdown} from './Dropdown';
import { classname } from './utils';

type PropTypes = {
  tag?: any,
  type?: string,
  size?: string,
  className?: string,
  children?: any
};

const defaultProps = {
  tag: 'div'
};

export const InputGroup = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
  ["className", "tag", "type", "size"]);

  const classes = () => classname(
    local.className,
    'input-group',
    local.size ? `input-group-${local.size}` : null
  )

  if (local.type === 'dropdown') {
    return <Dropdown {...attributes} className={classes()} />
  }

  return (
    <Dynamic 
      component={local.tag} 
      {...attributes} 
      class={classes()}>
    </Dynamic>
  );
};