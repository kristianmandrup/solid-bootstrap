import { Dynamic } from "solid-js/web";
import { classname } from "./utils";

const rowColWidths = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
type RowColsPropType = number | string

type PropTypes = {
  tag?: any,
  className?: string,
  form?: boolean,
  widths: any[]
  xs?: RowColsPropType,
  sm?: RowColsPropType,
  md?: RowColsPropType,
  lg?: RowColsPropType,
  xl?: RowColsPropType,
  xxl?: RowColsPropType
};

const defaultProps = {
  tag: 'div',
  widths: rowColWidths
};

export const Row = (props: any) => {
  const {
    className,
    tag,
    form,
    widths,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const colClasses: any[] = [];

  widths.forEach((colWidth: any, i: number) => {
    let colSize = props[colWidth];

    delete attributes[colWidth];

    if (!colSize) {
      return;
    }

    const isXs = !i;
    colClasses.push(isXs ? `row-cols-${colSize}` : `row-cols-${colWidth}-${colSize}`);
  });

  const classes = classname([
    className,
    form ? 'form-row' : 'row',
    colClasses
  ])

  return (
    <Dynamic component={tag} {...attributes} className={classes} />
  );
};
