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
  const {
    expand,
    className,
    cssModule,
    light,
    dark,
    fixed,
    sticky,
    color,
    container,
    tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classObj = {
    'navbar-light': light,
    'navbar-dark': dark,
    [`bg-${color}`]: color,
    [`fixed-${fixed}`]: fixed,
    [`sticky-${sticky}`]: sticky,
  }

  const classes = classname(
    className,
    'navbar',
    getExpandClass(expand),
    classObj
  )

  const containerClass = container && (container === true) ? 'container' : `container-${container}`;

  const renderChildren = () => container ?
  <div class={containerClass}>
    {props.children}
  </div> : props.children

  return (
    <Dynamic component={tag} {...attributes} class={classes}>
      {renderChildren()}
    </Dynamic>
  );
};
