import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  top?: boolean,
  bottom?: boolean,
  className?: string,  
  width?: string
  src?: string
  alt?: string
};

const defaultProps = {
  tag: 'img'
};

export const CardImg = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(props, defaultProps),
    ["className", "tag", "top", "bottom"
  ]);

  const classes = () => {
    let cardImgClassName = 'card-img';

    if (local.top) {
      cardImgClassName = 'card-img-top';
    }
    if (local.bottom) {
      cardImgClassName = 'card-img-bottom';
    }
  
    return classname(
      local.className,
      cardImgClassName
    )
  }

  return (
    <Dynamic component={local.tag} {...attributes} class={classes()} />
  );
};