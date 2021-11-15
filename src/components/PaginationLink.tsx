import { mergeProps, splitProps } from "solid-js";
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
  const [local, attributes]: any = splitProps(mergeProps(defaultProps, props),
  ["className", "tag", "next", "previous", "first", "last"]);

  const classes = () => classname(
    local.className,
    'page-link'
  );

  const defaultAriaLabel = () => {
    if (local.previous) {
      return 'Previous';
    } else if (local.next) {
      return 'Next';
    } else if (local.first) {
      return 'First';
    } else if (local.last) {
      return 'Last';
    }
  }

  const ariaLabel = () => local['aria-label'] || defaultAriaLabel();

  const defaultCaret = () => {
    if (local.previous) {
      return '\u2039';
    } else if (local.next) {
      return '\u203A';
    } else if (local.first) {
      return '\u00ab';
    } else if (local.last) {
      return '\u00bb';
    }
  }

  const tag = () => !attributes.href && local.tag === 'a' ? 'button' : local.tag

  const getChildren = () => {
    let children = local.children;
    if (children && Array.isArray(children) && children.length === 0) {
      children = null;
    }

    if (local.previous || local.next || local.first || local.last) {
      return [
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
          {ariaLabel()}
        </span>,
      ];
    }
  }

  return (
    <Dynamic component={tag()}
      {...attributes}
      class={classes()}
      aria-label={ariaLabel()}
    >
      {getChildren()}
    </Dynamic>
  );
};