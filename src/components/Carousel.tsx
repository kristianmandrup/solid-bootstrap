import { CarouselItem } from './CarouselItem';
import { CarouselContext } from './CarouselContext';
import { createSignal } from 'solid-js';

type PropTypes = {
  // the current active slide of the carousel
  activeIndex?: number,
  // a function which should advance the carousel to the next slide (via activeIndex)
  next: () => void,
  // a function which should advance the carousel to the previous slide (via activeIndex)
  previous: () => void,
  // controls if the left and right arrow keys should control the carousel
  keyboard?: boolean,
  /* If set to "hover", pauses the cycling of the carousel on mouseenter and resumes the cycling of the carousel on
   * mouseleave. If set to false, hovering over the carousel won't pause it. (default: "hover")
   */
  pause?: 'hover' | boolean,
  // Autoplays the carousel after the user manually cycles the first item. If "carousel", autoplays the carousel on load.
  // This is how bootstrap defines it... I would prefer a bool named autoplay or something...
  ride?: 'carousel' | boolean
  // the interval at which the carousel automatically cycles (default: 5000)
  // eslint-disable-next-line react/no-unused-prop-types
  interval?: any,
  children?: any,
  // called when the mouse enters the Carousel
  mouseEnter?: (...args: any[]) => void,
  // called when the mouse exits the Carousel
  mouseLeave?: (...args: any[]) => void,
  // controls whether the slide animation on the Carousel works or not
  slide?: boolean,
  // make the controls, indicators and captions dark on the Carousel
  dark?: boolean,  
  className?: string,
  enableTouch?: boolean,
  fade?: boolean
};

const defaultProps = {
  interval: 5000,
  pause: 'hover',
  keyboard: true,
  slide: true,
  enableTouch: true,
  fade: false,
};

const SWIPE_THRESHOLD = 40;

export const Carousel = (props: PropTypes) => {
  const [touchStartX, setTouchStartX] = createSignal(0);
  const [touchStartY, setTouchStartY] = createSignal(0);
  const [activeIndex, setActiveIndex] = createSignal(props.activeIndex);
  const [indicatorClicked, setIndicatorClicked] = createSignal(false);
  const [direction, setDirection] = createSignal('end');
  let cycleInterval: any;

  const getContextValue = () => {
    return { direction: direction() };
  }

  const setTimeInterval = () => {
    // make sure not to have multiple intervals going...
    clearTimeInterval();
    if (props.interval) {
      cycleInterval = setInterval(() => {
        props.next();
      }, parseInt(props.interval, 10));
    }
  }

  const clearTimeInterval = () => {
    clearInterval(cycleInterval);
  }
  
  const handleKeyPress = (evt?: any) => {
    if (props.keyboard) {
      if (evt.keyCode === 37) {
        props.previous();
      } else if (evt.keyCode === 39) {
        props.next();
      }
    }
  }
  

  // Set up the cycle
  if (props.ride === 'carousel') {
    setTimeInterval();
  }

    // TODO: move this to the specific carousel like bootstrap. Currently it will trigger ALL carousels on the page.
  document.addEventListener('keyup', handleKeyPress);
  

  // const getDerivedStateFromProps = (nextProps: any) => {
  //   let newState = null;    

  //   if (nextProps.activeIndex !== activeIndex) {
  //     // Calculate the direction to turn
  //     if (nextProps.activeIndex === activeIndex + 1) {
  //       setDirection('end');
  //     } else if (nextProps.activeIndex === activeIndex -1) {
  //       setDirection('start');
  //     } else if (nextProps.activeIndex < activeIndex) {
  //       setDirection(indicatorClicked ? 'start' : 'end');
  //     } else if (nextProps.activeIndex !== activeIndex) {
  //       setDirection(indicatorClicked ? 'end' : 'start');
  //     }

  //     newState = {
  //       activeIndex: nextProps.activeIndex,
  //       direction: direction(),
  //       indicatorClicked: false,
  //     }
  //   }

  //   return newState;
  // }



  const hoverStart = (...args: any[]) => {
    if (props.pause === 'hover') {
      clearTimeInterval();
    }
    if (props.mouseEnter) {
      props.mouseEnter(...args);
    }
  }

  const hoverEnd = (...args: any[]) => {
    if (props.pause === 'hover') {
      setTimeInterval();
    }
    if (props.mouseLeave) {
      props.mouseLeave(...args);
    }
  }

  const handleTouchStart = (e?:any) => {
    if(!props.enableTouch) {
      return;
    }
    setTouchStartX(e.changedTouches[0].screenX);
    setTouchStartY(e.changedTouches[0].screenY);
  }

  const handleTouchEnd = (e?:any) => {
    if(!props.enableTouch) {
      return;
    }

    const currentX = e.changedTouches[0].screenX;
    const currentY = e.changedTouches[0].screenY;
    const diffX = Math.abs(touchStartX() - currentX);
    const diffY = Math.abs(touchStartY() - currentY);

    // Don't swipe if Y-movement is bigger than X-movement
    if(diffX < diffY) {
      return;
    }

    if(diffX < SWIPE_THRESHOLD) {
      return;
    }

    if(currentX < touchStartX()) {
      props.next();
    } else {
      props.previous();
    }
  }

  const renderItems = (carouselItems: any[], className: string) => {
    const { slide } = props;
    return (
      <div className={className}>
        {carouselItems.map((item, index) => {
          const isIn = (index === activeIndex());
          return <div>cloned</div>
          // return cloneElement(item, {
          //   in: isIn,
          //   slide: slide,
          // });
        })}
      </div>
    );
  }


    const { slide, className, dark, fade } = props;
    const outerClasses = [
      className,
      'carousel',
      'carousel-fade' && fade,
      slide && 'slide',
      dark && 'carousel-dark'
    ]

    const innerClasses = [
      'carousel-inner'
    ]

    // filter out booleans, null, or undefined
    const children = props.children.filter((child: any) => child !== null && child !== undefined && typeof child !== 'boolean');

    const slidesOnly = children.every((child: any) => child.type === CarouselItem);

    // Rendering only slides
    if (slidesOnly) {
      return (
        <div class={outerClasses.join(' ')} onMouseEnter={hoverStart} onMouseLeave={hoverEnd}>
          <CarouselContext.Provider value={getContextValue()}>
            {renderItems(children, innerClasses.join(' '))}
          </CarouselContext.Provider>
        </div>
      );
    }

    // Rendering slides and controls
    if (children[0] instanceof Array) {
      const carouselItems = children[0];
      const controlLeft = children[1];
      const controlRight = children[2];

      return (
        <div class={outerClasses.join(' ')} onMouseEnter={hoverStart} onMouseLeave={hoverEnd}>
          <CarouselContext.Provider value={getContextValue()}>
            {renderItems(carouselItems, innerClasses.join(' '))}
            {controlLeft}
            {controlRight}
          </CarouselContext.Provider>
        </div>
      );
    }

    // Rendering indicators, slides and controls
    const indicators = children[0];
    const wrappedOnClick = (e?: any) => {
      if (typeof indicators.props.onClickHandler === 'function') {
        setIndicatorClicked(true)          
        indicators.props.onClickHandler(e)
      }
    };
    // const wrappedIndicators = cloneElement(indicators, { onClickHandler: wrappedOnClick });
    const carouselItems = children[1];
    const controlLeft = children[2];
    const controlRight = children[3];
    // {wrappedIndicators}

    return (
      <div class={outerClasses.join(' ')} onMouseEnter={hoverStart} onMouseLeave={hoverEnd}
        onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <CarouselContext.Provider value={getContextValue()}>
          
          {renderItems(carouselItems, innerClasses.join(' '))}
          {controlLeft}
          {controlRight}
        </CarouselContext.Provider>
      </div>
    );
  }

