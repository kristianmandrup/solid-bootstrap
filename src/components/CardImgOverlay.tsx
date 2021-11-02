import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  tag?: any,
  className?: string,
};

const defaultProps = {
  tag: 'div'
};

export const CardImgOverlay = (props: PropTypes) => {
  const {
    className,
    tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;
  const classes = classname(
    className,
    'card-img-overlay'
  )

  return (
    <Dynamic component={tag} {...attributes} class={classes} />
  );
};