import { Dynamic } from 'solid-js/web';
import {Dropdown} from './Dropdown';
import { classname } from './utils';

type PropTypes = {
  tag?: any,
  type?: boolean,
  size?: string,
  className?: string,
  children?: any
};

const defaultProps = {
  tag: 'div'
};

export const InputGroup = (props: PropTypes) => {
  const {
    className,
    tag,
    type,
    size,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any


  const classes = classname(
    className,
    'input-group',
    size ? `input-group-${size}` : null
  )

  if (attributes.type === 'dropdown') {
    return <Dropdown {...attributes} class={classes} />
  }

  return (
    <Dynamic component={tag} {...attributes} class={classes} />
  );
};