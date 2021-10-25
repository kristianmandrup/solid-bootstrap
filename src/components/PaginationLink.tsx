import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

type PropTypes = {
  'aria-label'?: string,
  children?: any,
  className?: string,
  next?: boolean,
  previous?: boolean,
  first?: boolean,
  last?: boolean,
  tag?: any,
  href?: string
};

const defaultProps = {
  tag: 'a',
};

export const PaginationLink = (props: PropTypes) => {
  let {
    className,
    next,
    previous,
    first,
    last,
    tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = classname([
    className,
    'page-link'
  ]);

  let defaultAriaLabel;
  if (previous) {
    defaultAriaLabel = 'Previous';
  } else if (next) {
    defaultAriaLabel = 'Next';
  } else if (first) {
    defaultAriaLabel = 'First';
  } else if (last) {
    defaultAriaLabel = 'Last';
  }

  const ariaLabel = props['aria-label'] || defaultAriaLabel;

  let defaultCaret;
  if (previous) {
    defaultCaret = '\u2039';
  } else if (next) {
    defaultCaret = '\u203A';
  } else if (first) {
    defaultCaret = '\u00ab';
  } else if (last) {
    defaultCaret = '\u00bb';
  }

  let children = props.children;
  if (children && Array.isArray(children) && children.length === 0) {
    children = null;
  }

  if (!attributes.href && tag === 'a') {
    tag = 'button';
  }

  if (previous || next || first || last) {
    children = [
      <span
        aria-hidden="true"
        data-key="caret"
      >
        {children || defaultCaret}
      </span>,
      <span
        class="visually-hidden"
        data-key="ariaLabel"
      >
        {ariaLabel}
      </span>,
    ];
  }

  return (
    <Dynamic component={tag}
      {...attributes}
      class={classes}
      aria-label={ariaLabel}
    >
      {children}
    </Dynamic>
  );
};