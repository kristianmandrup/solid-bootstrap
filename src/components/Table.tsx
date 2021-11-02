import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  className?: string,
  size?: string,
  bordered?: boolean,
  borderless?: boolean,
  striped?: boolean,
  dark?: boolean,
  hover?: boolean,
  responsive?: boolean | string,
  tag?: any,
  responsiveTag?: any,
  innerRef?: any,
  children?: any,
  style?: any,
};

const defaultProps = {
  tag: 'table',
  responsiveTag: 'div',
};

export const Table = (props: PropTypes) => {
  let {
    className,
    size,
    bordered,
    borderless,
    striped,
    dark,
    hover,
    responsive,
    tag,
    responsiveTag,
    innerRef,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = classname(
    className,
    'table',
    size ? 'table-' + size : false,
    bordered ? 'table-bordered' : false,
    borderless ? 'table-borderless' : false,
    striped ? 'table-striped' : false,
    dark ? 'table-dark' : false,
    hover ? 'table-hover' : false,
  )

  const table = () => <Dynamic 
    component={tag} 
    {...attributes} 
    ref={innerRef} 
    class={classes}>{props.children}</Dynamic>

  if (responsive) {
    const responsiveClassName = responsive === true ? 'table-responsive' : `table-responsive-${responsive}`

    return (
      <Dynamic component={responsiveTag} class={responsiveClassName}>{table()}</Dynamic>
    );
  }

  return table();
};