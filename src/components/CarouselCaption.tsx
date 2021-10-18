import 'solid-js/jsx-runtime'

type PropTypes = {
  captionText: any,
  captionHeader?: any,  
  className?: string,
};

export const CarouselCaption = (props: PropTypes) => {
  const { captionHeader, captionText, className } = props;
  const classes = [
    className,
    'carousel-caption',
    'd-none',
    'd-md-block'
  ].join(' ')

  return (
    <div class={classes}>
      <h3>{captionHeader}</h3>
      <p>{captionText}</p>
    </div>
  );
};

