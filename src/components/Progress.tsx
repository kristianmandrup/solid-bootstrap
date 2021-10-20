import { toNumber } from './utils';

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

const Progress = (props: PropTypes) => {
  const {
    children,
    className,
    barClassName,
    value,
    min,
    max,
    animated,
    striped,
    color,
    bar,
    multi,
    tag: Tag,
    style,
    barStyle,
    barAriaValueText,
    barAriaLabelledBy,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const percent = ((toNumber(value) / toNumber(max)) * 100);

  const progressClasses = [
    className,
    'progress'
  ]

  const progressBarClasses = [
    'progress-bar',
    bar ? className || barClassName : barClassName,
    animated ? 'progress-bar-animated' : null,
    color ? `bg-${color}` : null,
    striped || animated ? 'progress-bar-striped' : null
  ].join(' ')

  const progressBarProps: any = {
    class: progressBarClasses,
    style: {
      ...(bar ? style : {}),
      ...barStyle,
      width: `${percent}%`,
    },
    role: 'progressbar',
    'aria-valuenow': value,
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuetext': barAriaValueText,
    'aria-labelledby': barAriaLabelledBy,
    children: children
  };

  if (bar) {
    return (
      <Tag 
        {...attributes}
        {...progressBarProps} 
      />
    );
  }

  return (
    <Tag {...attributes} style={style} className={progressClasses}>
      {multi ? children : <div {...progressBarProps} />}
    </Tag>
  );
};