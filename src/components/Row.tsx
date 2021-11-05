import { mergeProps, splitProps } from "solid-js";
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
  const [local, attributes]: any = splitProps(mergeProps(props, defaultProps),
  ["className", "tag", "form", "widths"]);

  const colClasses = () => local.widths.reduce((colClasses: any[], colWidth: any, i: number) => {
    let colSize = props[colWidth];

    delete attributes[colWidth];

    if (!colSize) {
      return;
    }

    const isXs = !i;
    colClasses.push(isXs ? `row-cols-${colSize}` : `row-cols-${colWidth}-${colSize}`);
    return colClasses
  }, []);

  const classes = () => classname(
    local.className,
    local.form ? 'form-row' : 'row',
    colClasses()
  )

  return (
    <Dynamic component={local.tag} {...attributes} class={classes()} />
  );
};
