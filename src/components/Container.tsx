import { classname, classnames } from "./utils";

type ContainerPropTypes = {
  tag: any,
  fluid: boolean | string,
  className: string,
};

const $defaultProps = {
  tag: 'div',
};

const Container = (props: ContainerPropTypes) => {
  const {
    className,
    fluid,
    tag: Tag,
    ...attributes
  } = {
    ...$defaultProps,
    ...props
  } as any;

  let containerClass = 'container';
  if (fluid === true) {
    containerClass = 'container-fluid';
  }
  else if (fluid) {
    containerClass = `container-${fluid}`;
  }

  const classes = classname([
    className,
    containerClass
  ])

  return (
    <Tag {...attributes} className={classes} />
  );
};