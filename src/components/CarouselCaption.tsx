import { mergeProps, splitProps } from "solid-js";
import { classname } from "./utils";

type PropTypes = {
  captionText: any,
  captionHeader?: any,  
  className?: string,
};

const defaultProps = {}

export const CarouselCaption = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(props, defaultProps),
    ["className", "captionHeader", "captionText"
  ]);

  const classes = () => classname(
    local.className,
    'carousel-caption',
    'd-none',
    'd-md-block'
  )

  return (
    <div class={classes()}>
      <h3>{local.captionHeader}</h3>
      <p>{local.captionText}</p>
    </div>
  );
};

