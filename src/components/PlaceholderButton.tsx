import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Button } from "./Button";
import { getColumnClasses } from './Col';
import { classname } from "./utils";

type PropTypes = {
  size?: string,
  color?: string,
  outline?: boolean,
  className?: string,
  tag?: any
  children?: any
}

const defaultProps = {
  color: 'primary',
  tag: Button
}

export const PlaceholderButton = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
  ["className", "tag", ]);

  const modifiedAttributes = () => getColumnClasses(attributes).attributes

  const classes = () => {
    const { colClasses } = getColumnClasses(attributes)

    return classname(
      "placeholder",
      local.className,
      colClasses
    )
  }

  return (
    <Dynamic 
      component={local.tag} 
      {...modifiedAttributes()} 
      class={classes()} 
      disabled={true} />
  )
}