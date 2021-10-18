import 'solid-js/jsx-runtime'
type PropTypes = {
  tag: any,
  fluid: boolean | string,
  className: string,
};

const defaultProps = {
  tag: 'div',
};

const Container = (props: PropTypes) => {
  const {
    className,
    fluid,
    tag: Tag,
    ...attributes
  } = props;

  let containerClass = 'container';
  if (fluid === true) {
    containerClass = 'container-fluid';
  }
  else if (fluid) {
    containerClass = `container-${fluid}`;
  }

  const classes = [
    className,
    containerClass
  ]

  return (
    <Tag {...attributes} className={classes} />
  );
};