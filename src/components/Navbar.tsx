import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  light?: boolean,
  dark?: boolean,
  full?: boolean,
  fixed?: string,
  sticky?: string,
  color?: string,
  role?: string,
  tag?: any,
  container?: boolean | string
  className?: string,
  cssModule?: object,
  expand?: boolean | string,
  children?: any,
};

const defaultProps = {
  tag: 'nav',
  expand: false,
  container: 'fluid',
};

const getExpandClass = (expand: any) => {
  if (expand === false) {
    return false;
  } else if (expand === true || expand === 'xs') {
    return 'navbar-expand';
  }

  return `navbar-expand-${expand}`;
};

export const Navbar = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(props, defaultProps),
  ["className", "tag", "expand", "light", "dark",
    "fixed", "sticky", "color", "container"]);

  const classObj = () => ({
    'navbar-light': local.light,
    'navbar-dark': local.dark,
    [`bg-${local.color}`]: local.color,
    [`fixed-${local.fixed}`]: local.fixed,
    [`sticky-${local.sticky}`]: local.sticky,
  })

  const classes = () => classname(
    local.className,
    'navbar',
    getExpandClass(local.expand),
    classObj
  )

  const containerClass = () => local.container && (local.container === true) ? 'container' : `container-${local.container}`;

  const renderChildren = () => local.container ?
  <div class={containerClass()}>
    {props.children}
  </div> : props.children

  return (
    <Dynamic component={local.tag} {...attributes} class={classes()}>
      {renderChildren()}
    </Dynamic>
  );
};
