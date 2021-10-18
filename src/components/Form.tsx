type PropTypes = {
  children?: any,
  inline?: boolean,
  tag?: any,
  innerRef?: any,
  className: string,
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
    tag: Tag,
    innerRef,
    ...attributes
  } = props;

  const classes = [
    className,
    inline ? 'form-inline' : false
  ]

  return (
    <Tag {...attributes} ref={innerRef} className={classes} />
  );
}
