import 'solid-js/jsx-runtime'

type PropTypes = {
  tag: any,
  className: string,
};

const defaultProps = {
  tag: 'div'
};

export const CardImgOverlay = (props: PropTypes) => {
  const {
    className,
    tag: Tag,
    ...attributes
  } = props;
  const classes = [
    className,
    'card-img-overlay'
  ]

  return (
    <Tag {...attributes} className={classes} />
  );
};