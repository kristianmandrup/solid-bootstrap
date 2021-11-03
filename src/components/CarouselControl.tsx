import { mergeProps, splitProps } from "solid-js";
import { classname } from "./utils";

type PropTypes = {
  direction: 'prev' | 'next',
  onClickHandler?: (e?: any) => void,
  directionText?: string,
  className?: string,
};

const defaultProps = {}

export const CarouselControl = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(props, defaultProps),
  ["className", "direction", "onClickHandler", "directionText"]);

  const anchorClasses = () => classname(
    local.className,
    `carousel-control-${local.direction}`
  )

  const iconClasses = () => `carousel-control-${local.direction}-icon`

  const screenReaderClasses = 'visually-hidden'

  return (
    // We need to disable this linting rule to use an `<a>` instead of
    // `<button>` because that's what the Bootstrap examples require:
    // https://getbootstrap.com/docs/4.5/components/carousel/#with-controls
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      class={anchorClasses()}
      style={{cursor: "pointer"}}
      role="button"
      tabIndex="0"
      onClick={(e) => {
        e.preventDefault();
        local.onClickHandler && local.onClickHandler();
      }}
    >
      <span class={iconClasses()} aria-hidden="true" />
      <span class={screenReaderClasses}>{local.directionText || local.direction}</span>
    </a>
  );
};

