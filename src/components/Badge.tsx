import { classname } from "./utils";

const defaultProps = {
  color: 'secondary',
  pill: false,
  tag: 'span'
};

type PropTypes = {
  className?: string
  tag?: any
  color?: string
  pill?: boolean,
  innerRef?: any
  children?: any,
}

export const Badge = (props: PropTypes) => {
  let {
    className,
    color,
    innerRef,
    pill,
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;

  const classes: string = classname([
    className,
    'badge',
    'bg-' + color,
    pill ? 'rounded-pill' : false
  ])

  if (attributes.href && Tag === 'span') {
    Tag = 'a';
  }

  return (
    <Tag className={classes} {...attributes} ref={innerRef}></Tag>
  );
};