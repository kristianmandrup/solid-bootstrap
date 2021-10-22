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
    cssModule,
    tag: Tag,
    type,
    size,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any
  const classes = classname([
    className,
    'input-group',
    size ? `input-group-${size}` : null
  ])

  if (attributes.type === 'dropdown') {
    return <Dropdown {...attributes} className={classes} />
  }

  return (
    <Tag {...attributes} className={classes} />
  );
};