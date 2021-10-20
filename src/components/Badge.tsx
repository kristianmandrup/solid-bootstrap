import 'solid-js/jsx-runtime'

const defaultProps = {
  color: 'secondary',
  pill: false,
  tag: 'span'
};

type PropTypes = {
  className?: string
  tag?: any
  color?: string
  innerRef?: any
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

  const classes: string = [
    className,
    'badge',
    'bg-' + color,
    pill ? 'rounded-pill' : false
  ].filter(c => c).join('');

  if (attributes.href && Tag === 'span') {
    Tag = 'a';
  }

  return (
    <Tag className={classes} {...attributes} ref={innerRef}></Tag>
  );
};