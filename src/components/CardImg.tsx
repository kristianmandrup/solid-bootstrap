import 'solid-js/jsx-runtime'

type PropTypes = {
  tag: any,
  top: boolean,
  bottom: boolean,
  className: string,  
};

const defaultProps = {
  tag: 'img'
};

export const CardImg = (props: PropTypes) => {
  const {
    className,
    top,
    bottom,
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any;


  let cardImgClassName = 'card-img';
  if (top) {
    cardImgClassName = 'card-img-top';
  }
  if (bottom) {
    cardImgClassName = 'card-img-bottom';
  }

  const classes = [
    className,
    cardImgClassName
  ]

  return (
    <Tag {...attributes} className={classes} />
  );
};