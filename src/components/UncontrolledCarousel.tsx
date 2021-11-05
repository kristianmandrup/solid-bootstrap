import {Carousel} from './Carousel';
import {CarouselItem} from './CarouselItem';
import {CarouselControl} from './CarouselControl';
import {CarouselIndicators} from './CarouselIndicators';
import {CarouselCaption} from './CarouselCaption';
import { createSignal, mergeProps, splitProps } from 'solid-js';

type PropTypes = {
  items: any[]
  indicators?: boolean,
  controls?: boolean,
  autoPlay?: boolean,
  defaultActiveIndex?: number,
  activeIndex?: number,
  next?: (e?: any) => void,
  previous?: (e?: any) => void,
  goToIndex?: (e?: any) => void,
};

const defaultProps = {
  controls: true,
  indicators: true,
  autoPlay: true,
};

export const UncontrolledCarousel = (props: PropTypes) => {
  const [animating, setAnimating] = createSignal(false);
  const [activeIndex, setActiveIndex ] = createSignal(props.defaultActiveIndex || 0)
  
  const onExiting = () => {
    setAnimating(true);
  }

  const onExited = () => {
    setAnimating(false);
  }

  const next = () => {
    if (animating()) return;
    const nextIndex = activeIndex() === props.items.length - 1 ? 0 : activeIndex() + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating()) return;
    const nextIndex = activeIndex() === 0 ? props.items.length - 1 : activeIndex() - 1;
    setActiveIndex(nextIndex);
  }

  const toIndex = (newIndex: any) => {
    if (animating()) return;
    setActiveIndex(newIndex);
  }

  const [local, attributes]: any = splitProps(mergeProps(props, defaultProps),
  ["defaultActiveIndex", "autoPlay", "indicators", "controls", "items", "goToIndex"]);

  const slides = () => local.items.map((item: any) => {
    return (
      <CarouselItem
        onExiting={onExiting}
        onExited={onExited}
      >
        <img className="d-block w-100" src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.header || item.caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex()}
      next={next}
      previous={previous}
      ride={local.autoPlay ? 'carousel' : undefined}
      {...props}
    >
      {local.indicators && <CarouselIndicators
        items={local.items}
        activeIndex={local.activeIndex || activeIndex()}
        onClickHandler={local.goToIndex || toIndex}
      />}
      {slides()}
      {local.controls && <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={local.previous || previous}
      />}
      {local.controls && <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={local.next || next}
      />}
    </Carousel>
  );
}


