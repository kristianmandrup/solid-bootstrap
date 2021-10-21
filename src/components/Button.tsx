type PropTypes = {
  active?: boolean,
  'aria-label'?: string,
  block?: boolean,
  color?: string,
  disabled?: boolean,
  outline?: boolean,
  tag?: any,
  innerRef?: any,
  onClick?: (...args: any[]) => void,
  size?: string,
  children?: any,
  className?: string,
  style?: string,
  close?: boolean,
};

const defaultProps = {
  color: 'secondary',
  tag: 'button',
};

export const Button = (props: PropTypes) => {
    let {
      active,
      'aria-label': ariaLabel,
      block,
      className,
      close,
      color,
      outline,
      size,
      tag: Tag,
      innerRef,
      ...attributes
    } = {
      ...defaultProps,
      ...props
    } as any;

    const btnOutlineColor = `btn${outline ? '-outline' : ''}-${color}`;

    const classes = [
      className,
      close && 'btn-close',
      close || 'btn',
      close || btnOutlineColor,
      size ? `btn-${size}` : false,
      block ? 'd-block w-100' : false,
      { active, disabled: props.disabled }
    ]

    if (attributes.href && Tag === 'button') {
      Tag = 'a';
    }

    const defaultAriaLabel = close ? 'Close' : null;

    return (
      <Tag
        type={(Tag === 'button' && attributes.onClick) ? 'button' : undefined}
        {...attributes}
        className={classes}
        ref={innerRef}
        onClick={props.onClick}
        aria-label={ariaLabel || defaultAriaLabel}
      />
    );
  }