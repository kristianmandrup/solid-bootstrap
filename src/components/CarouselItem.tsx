import { Transition } from 'solid-transition-group';
import { createSignal } from 'solid-js';
import { TransitionTimeouts, TransitionStatuses } from './utils';

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
    
  const onEnter = (node: any) => {
    setStartAnimation(false);
    props.onEnter && props.onEnter(node);
  }

  const onEntering = (node: any) => {
    // getting this variable triggers a reflow
    const offsetHeight = node.offsetHeight;
    setStartAnimation(true);
    props.onEntering && props.onEntering(node);
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
    node.dispatchEvent(new CustomEvent('slid.bs.carousel'));
    props.onExited && props.onExited(node);
  }

  
  const onTransition = (status: any) => {
    const isActive = (status === TransitionStatuses.ENTERED) || (status === TransitionStatuses.EXITING);
    const directionClassName = (status === TransitionStatuses.ENTERING || status === TransitionStatuses.EXITING) &&
      startAnimation &&
      (direction() == 'end' ? 'carousel-item-start' : 'carousel-item-end');
    const orderClassName = (status === TransitionStatuses.ENTERING) &&
      (direction() == 'end' ? 'carousel-item-next' : 'carousel-item-prev');
    const itemClasses = [
      className,
      'carousel-item',
      isActive && 'active',
      directionClassName,
      orderClassName,
    ]

    return (
      <Tag className={itemClasses}>
        {children}
      </Tag>
    );  
  }

  const { in: isIn, children, slide, tag: Tag, className, ...transitionProps } = {
    ...defaultProps,
    ...props
  };

  return (
    // {...transitionProps}
    <Transition      
      appear={slide}
      onBeforeEnter={onEnter}
      onEnter={onEntering}
      onBeforeExit={onExit}
      onExit={onExiting}
      onAfterExit={onExited}
    >
    </Transition>
  );
}

