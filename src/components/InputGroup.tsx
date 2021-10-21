import {Dropdown} from './Dropdown';

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
  const classes = [
    className,
    'input-group',
    size ? `input-group-${size}` : null
  ]

  if (attributes.type === 'dropdown') {
    return <Dropdown {...attributes} className={classes} />
  }

  return (
    <Tag {...attributes} className={classes} />
  );
};