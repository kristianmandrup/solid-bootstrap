import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  children?: any,
  inline?: boolean,
  tag?: any,
  innerRef?: any,
  className?: string,
};

const defaultProps = {
  tag: 'form',
};

export const Form = (props: PropTypes) => {
  let ref: any;

  const getRef = ($ref: any) => {
    if (props.innerRef) {
      props.innerRef($ref);
    }
    ref = $ref;
  }

  const submit = () => {
    if (ref) {
      ref.submit();
    }
  }

  const {
    className,
    inline,
    tag,
    innerRef,
    ...attributes
  } = props;

  const classes = classname([
    className,
    inline ? 'form-inline' : false
  ])

  return (
    <Dynamic component={tag} {...attributes} ref={innerRef} class={classes} />
  );
}
