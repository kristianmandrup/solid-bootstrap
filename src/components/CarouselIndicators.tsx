import { mergeProps, splitProps } from "solid-js";
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
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
  ["className", "activeIndex", "onClickHandler", "items"]);

  const listClasses = () => classname(local.className, 'carousel-indicators');

  const indicators = () => local.items.map((item, idx) => {
    const indicatorClasses = classname(
      { active: local.activeIndex === idx }
    )
    return (
      <button
        aria-label={item.caption}
        data-bs-target
        data-key={`${item.key || Object.values(item).join('')}`}
        onClick={(e) => {
          e.preventDefault();
          local.onClickHandler(idx);
        }}
        class={indicatorClasses}
      >
        {item.caption}
      </button>);
  });

  return (
    <div class={listClasses()}>
      {indicators()}
    </div>
  );
};

