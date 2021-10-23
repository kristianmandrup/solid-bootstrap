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
    children,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = classname([
    className,
    'navbar',
    getExpandClass(expand),
    {
      'navbar-light': light,
      'navbar-dark': dark,
      [`bg-${color}`]: color,
      [`fixed-${fixed}`]: fixed,
      [`sticky-${sticky}`]: sticky,
    }
  ])

  const containerClass = container && (container === true) ? 'container' : `container-${container}`;

  return (
    <Dynamic component={tag} {...attributes} className={classes}>
      { container ?
        <div className={containerClass}>
          {children}
        </div> :
        children
      }
    </Dynamic>
  );
};
