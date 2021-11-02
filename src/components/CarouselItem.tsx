import { Transition } from 'solid-transition-group';
import { createSignal } from 'solid-js';
import { TransitionTimeouts, TransitionStatuses, classname } from './utils';
import { Dynamic } from 'solid-js/web';

interface TransitionPropTypes { 
  onEnter?: (node:any) => void
  onEntering?: (node:any) => void
  onEntered?: (node:any) => void
  onExit?: (node:any) => void
  onExiting?: (node:any) => void
  onExited?: (node:any) => void
}

interface PropTypes extends TransitionPropTypes {
  tag?: any,
  in?: boolean,
  children?: any,
  slide?: boolean,
  className?: string,
  direction?: string
};

const defaultProps = {
  // ...Transition.defaultProps,
  tag: 'div',
  timeout: TransitionTimeouts.Carousel,
  slide: true,
};

type ContextTypes = {
  direction?: string
};

export const CarouselItem = (props: PropTypes) => {  
  const [startAnimation, setStartAnimation] = createSignal(false)
  const [direction, setDirection] = createSignal(props.direction)
  const [isActive, setActive] = createSignal(false)
  const [hasEntered, setEntered] = createSignal(false)
    
  const onEnter = (node: any) => {
    setStartAnimation(false);
    setEntered(true)
    props.onEnter && props.onEnter(node);
  }

  const onEntering = (node: any) => {
    // getting this variable triggers a reflow
    const offsetHeight = node.offsetHeight;
    setStartAnimation(true);
    props.onEntering && props.onEntering(node);
    setActive(true)
    return offsetHeight;
  }

  const onExit = (node: any) => {
    setStartAnimation(false);
    props.onExit && props.onExit(node);
  }

  const onExiting = (node: any) => {
    setStartAnimation(true);
    node.dispatchEvent(new CustomEvent('slide.bs.carousel'));
    props.onExiting && props.onExiting(node);
  }

  const onExited = (node: any) => {
    setEntered(false)
    setActive(false)
    node.dispatchEvent(new CustomEvent('slid.bs.carousel'));
    props.onExited && props.onExited(node);
  }

  
  const onTransition = () => {
    const directionClassName = isActive() &&
      startAnimation &&
      (direction() == 'end' ? 'carousel-item-start' : 'carousel-item-end');
    const orderClassName = hasEntered() &&
      (direction() == 'end' ? 'carousel-item-next' : 'carousel-item-prev');
    const itemClasses = classname(
      className,
      'carousel-item',
      isActive() && 'active',
      directionClassName,
      orderClassName,
    )

    return (
      <Dynamic component={tag} class={itemClasses}>
        {children}
      </Dynamic>
    );  
  }

  const { in: isIn, children, slide, tag, className, ...transitionProps } = {
    ...defaultProps,
    ...props
  };

  return (
    <Transition      
      appear={slide}
      onBeforeEnter={onEnter}
      onEnter={onEntering}
      onBeforeExit={onExit}
      onExit={onExiting}
      onAfterExit={onExited}
      {...transitionProps}
    >
      {onTransition()}
    </Transition>
  );
}

