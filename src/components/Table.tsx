import { mergeProps, splitProps } from "solid-js";
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
  ref?: any,
  children?: any,
  style?: any,
};

const defaultProps = {
  tag: 'table',
  responsiveTag: 'div',
};

export const Table = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(defaultProps, props),
  ["className", "tag", "size", "bordered", "borderless",
    "striped", "dark", "hover", "responsive", "responsiveTag"
]);

  const classes = () => classname(
    local.className,
    'table',
    local.size ? 'table-' + local.size : false,
    local.bordered ? 'table-bordered' : false,
    local.borderless ? 'table-borderless' : false,
    local.striped ? 'table-striped' : false,
    local.dark ? 'table-dark' : false,
    local.hover ? 'table-hover' : false,
  )

  const table = () => <Dynamic 
    component={local.tag} 
    {...attributes} 
    ref={props.ref} 
    class={classes}>{props.children}</Dynamic>

  const responsiveTable = () => {
    const responsiveClassName = () => {
      return local.responsive === true ? 'table-responsive' : `table-responsive-${local.responsive}`;
    }

    return <Dynamic component={local.responsiveTag} class={responsiveClassName()}>{table()}</Dynamic>
  }

  return local.responsive ? responsiveTable() : table();
};