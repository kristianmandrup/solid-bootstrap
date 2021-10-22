import { classname } from "./utils";

type PropTypes = {
  direction: 'prev' | 'next',
  onClickHandler?: (e?: any) => void,
  directionText?: string,
  className?: string,
};

export const CarouselControl = (props: PropTypes) => {
  const { direction, onClickHandler, directionText, className } = props;

  const anchorClasses = classname([
    className,
    `carousel-control-${direction}`
  ])

  const iconClasses = classname([
    `carousel-control-${direction}-icon`
  ])

  const screenReaderClasses = classname([
    'visually-hidden'
  ])


  return (
    // We need to disable this linting rule to use an `<a>` instead of
    // `<button>` because that's what the Bootstrap examples require:
    // https://getbootstrap.com/docs/4.5/components/carousel/#with-controls
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      class={anchorClasses}
      style={{cursor: "pointer"}}
      role="button"
      tabIndex="0"
      onClick={(e) => {
        e.preventDefault();
        onClickHandler && onClickHandler();
      }}
    >
      <span class={iconClasses} aria-hidden="true" />
      <span class={screenReaderClasses}>{directionText || direction}</span>
    </a>
  );
};

