import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  body?: boolean,
  bottom?: boolean,
  children?: any,
  className?: string,
  heading?: boolean,
  left?: boolean,
  list?: boolean,
  middle?: boolean,
  object?: boolean,
  right?: boolean,
  tag?: any,
  top?: boolean,
  href?: any
  alt?: string
};

const defaultProps ={
};

export const Media = (props: PropTypes) => {
  let {
    body,
    bottom,
    className,
    heading,
    left,
    list,
    middle,
    object,
    right,
    tag,
    top,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  let defaultTag;
  if (heading) {
    defaultTag = 'h4';
  } else if (attributes.href) {
    defaultTag = 'a';
  } else if (attributes.src || object) {
    defaultTag = 'img';
  } else if (list) {
    defaultTag = 'ul';
  } else {
    defaultTag = 'div';
  }
  tag = tag || defaultTag;

  const classes = classname([
    className,
    {
      'media-body': body,
      'media-heading': heading,
      'media-left': left,
      'media-right': right,
      'media-top': top,
      'media-bottom': bottom,
      'media-middle': middle,
      'media-object': object,
      'media-list': list,
      media: !body && !heading && !left && !right && !top && !bottom && !middle && !object && !list,
    }
  ])

  return (
    <Dynamic component={tag} {...attributes} className={classes} />
  );
};