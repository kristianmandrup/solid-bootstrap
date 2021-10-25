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
}

const defaultProps = {
  color: 'primary',
  tag: Button
}

export const PlaceholderButton = (props: PropTypes) => {
  let {
    className,
    tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  let { attributes: modifiedAttributes, colClasses } = getColumnClasses(attributes)

  const classes = classname([
    "placeholder",
    className,
    colClasses
  ])

  return (
    <Dynamic component={tag} {...modifiedAttributes} class={classes} disabled={true}></Dynamic>
  )
}