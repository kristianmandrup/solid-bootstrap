type PropTypes = {
  tag?: any,
  type?: string,
  size?: string,
  color?: string,
  className?: string,
  children?: string
};

const defaultProps = {
  tag: 'div',
  type: 'border',
  children: 'Loading...'
};

export const Spinner = (props: PropTypes) => {
  const {
    className,
    type,
    size,
    color,
    children,
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = [
      className,
      size ? `spinner-${type}-${size}` : false,
      `spinner-${type}`,
      color ? `text-${color}` : false  
  ]
  return (
    <Tag role="status" {...attributes} className={classes}>
      {children &&
        <span class={'visually-hidden'}>
          {children}
        </span>
      }
    </Tag>
  );
};