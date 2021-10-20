import { Button } from "./Button";
import { getColumnClasses } from './Col';

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
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  let { attributes: modifiedAttributes, colClasses } = getColumnClasses(attributes)

  const classes = [
    "placeholder",
    className,
    colClasses
  ]

  return (
    <Button {...modifiedAttributes} className={classes} disabled={true}></Button>
  )
}