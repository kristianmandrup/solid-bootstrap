import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname, classnames } from "./utils";

type ContainerPropTypes = {
  tag?: any,
  fluid?: boolean | string,
  className?: string,
  children?: any
};

const defaultProps = {
  tag: 'div',
};

export const Container = (props: ContainerPropTypes) => {
  const [local, attributes] = splitProps(mergeProps(props, defaultProps),
  ["className", "fluid", "tag"]);

  const containerClass = () => {  
    let _containerClass = 'container';
    if (local.fluid === true) {
      _containerClass = 'container-fluid';
    }
    else if (local.fluid) {
      _containerClass = `container-${local.fluid}`;
    }
    return _containerClass
  }

  const classes = () => {
    classname(
      local.className,
      containerClass()
    )
  }

  return (
    <Dynamic component={local.tag} {...attributes} class={classes()} />
  );
};