import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tabs?: boolean,
  pills?: boolean,
  vertical?: boolean | string,
  horizontal?: string,
  justified?: boolean,
  fill?: boolean,
  navbar?: boolean,
  card?: boolean,
  tag?: any,
  className?: string,
  children?: any,
};

const defaultProps = {
  tag: 'ul',
  vertical: false,
};

const getVerticalClass = (vertical: any) => {
  if (vertical === false) {
    return false;
  } else if (vertical === true || vertical === 'xs') {
    return 'flex-column';
  }

  return `flex-${vertical}-column`;
};

export const Nav = (props: PropTypes) => {
  const {
    className,
    tabs,
    pills,
    vertical,
    horizontal,
    justified,
    fill,
    navbar,
    card,
    tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = classname([
    className,
    navbar ? 'navbar-nav' : 'nav',
    horizontal ? `justify-content-${horizontal}` : false,
    getVerticalClass(vertical),
    {
      'nav-tabs': tabs,
      'card-header-tabs': card && tabs,
      'nav-pills': pills,
      'card-header-pills': card && pills,
      'nav-justified': justified,
      'nav-fill': fill,
    }
  ])

  return (
    <Dynamic component={tag} {...attributes} class={classes} />
  );
};