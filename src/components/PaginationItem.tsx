import { classname } from "./utils";

type PropTypes = {
  active?: boolean,
  children?: any,
  className?: string,  
  disabled?: boolean,
  tag?: any,
};

const defaultProps = {
  tag: 'li',
};

export const PaginationItem = (props: PropTypes) => {
  const {
    active,
    className,
    disabled,
    tag: Tag,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const classes = classname([
    className,
    'page-item',
    {
      active,
      disabled,
    }
  ])

  return (
    <Tag {...attributes} className={classes} />
  );
};