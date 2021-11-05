import { mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { classname, toNumber } from './utils';

type PropTypes = {
  children?: any,
  bar?: boolean,
  multi?: boolean,
  tag?: any,
  value?: string | number,
  min?: string | number,
  max?: string | number,
  animated?: boolean,
  striped?: boolean,
  color?: string,
  className?: string,
  barClassName?: string,
  style?: any,
  barStyle?: any,
  barAriaValueText?: string,
  barAriaLabelledBy?: string,
};

const defaultProps = {
  tag: 'div',
  value: 0,
  min: 0,
  max: 100,
  style: {},
  barStyle: {}
};

export const Progress = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(props, defaultProps),
  ["className", "tag", "barClassName", "value", "min", "max",
    "animated", "striped", "color", "bar", "multi", "style",
    "barStyle", "barAriaValueText", "barAriaLabelledBy", "children"]);


  const percent = () => (toNumber(local.value) / toNumber(local.max)) * 100;

  const progressClasses = () => classname(
    local.className,
    'progress'
  )

  const progressBarClasses = () => classname(
    'progress-bar',
    local.bar ? local.className || local.barClassName : local.barClassName,
    local.animated ? 'progress-bar-animated' : null,
    local.color ? `bg-${local.color}` : null,
    local.striped || local.animated ? 'progress-bar-striped' : null
  )

  const progressBarProps: any = () => ({
    class: progressBarClasses,
    style: {
      ...(local.bar ? local.style : {}),
      ...local.barStyle,
      width: `${percent}%`,
    },
    role: 'progressbar',
    'aria-valuenow': local.value,
    'aria-valuemin': local.min,
    'aria-valuemax': local.max,
    'aria-valuetext': local.barAriaValueText,
    'aria-labelledby': local.barAriaLabelledBy,
    children: local.children
  });

  const prgBarProps = progressBarProps()

  const Bar = () => <Dynamic component={local.tag}
    {...attributes}
    {...prgBarProps} 
  />

  const Inside = () => local.multi ? local.children : <div {...prgBarProps} />

  const DefaultProgress = () => <Dynamic component={local.tag} {...attributes} style={local.style} class={progressClasses()}>
  {Inside()}
</Dynamic>


  return local.bar ? Bar() : DefaultProgress()
};