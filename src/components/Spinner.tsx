import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

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
    tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = classname([
      className,
      size ? `spinner-${type}-${size}` : false,
      `spinner-${type}`,
      color ? `text-${color}` : false  
  ])
  return (
    <Dynamic component={tag} role="status" {...attributes} class={classes}>
      {children &&
        <span class={'visually-hidden'}>
          {children}
        </span>
      }
    </Dynamic>
  );
};