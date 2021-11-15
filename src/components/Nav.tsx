import { mergeProps, splitProps } from "solid-js";
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

export const Nav = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(defaultProps, props),
  ["className", "tag", "tabs", "pills", "vertical", "horizontal",
    "justified", "fill", "navbar", "card",
  ]);

  const getVerticalClass = () => {
    if (local.vertical === false) {
      return false;
    } else if (local.vertical === true || local.vertical === 'xs') {
      return 'flex-column';
    }
  
    return `flex-${local.vertical}-column`;
  };
  
  const classObj = () => ({
    'nav-tabs': local.tabs,
    'card-header-tabs': local.card && local.tabs,
    'nav-pills': local.pills,
    'card-header-pills': local.card && local.pills,
    'nav-justified': local.justified,
    'nav-fill': local.fill,
  })

  const classes = () => classname(
    local.className,
    local.navbar ? 'navbar-nav' : 'nav',
    local.horizontal ? `justify-content-${local.horizontal}` : false,
    getVerticalClass(),
    classObj()
  )

  return (
    <Dynamic component={local.tag} {...attributes} class={classes()} />
  );
};