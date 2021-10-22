import { classname } from "./utils";

type PropTypes = {
  items: any[],
  activeIndex: number,
  onClickHandler: (e?: any) => void,
  className?: string,
};

const defaultProps = {

}

export const CarouselIndicators = (props: PropTypes) => {
  const { items, activeIndex, onClickHandler, className } = {
    ...defaultProps,
    ...props
  };

  const listClasses = classname([className, 'carousel-indicators']);
  const indicators = items.map((item, idx) => {
    const indicatorClasses = classname([
      { active: activeIndex === idx }
    ])
    return (
      <button
        aria-label={item.caption}
        data-bs-target
        data-key={`${item.key || Object.values(item).join('')}`}
        onClick={(e) => {
          e.preventDefault();
          onClickHandler(idx);
        }}
        class={indicatorClasses}
      >
        {item.caption}
      </button>);
  });

  return (
    <div class={listClasses}>
      {indicators}
    </div>
  );
};

