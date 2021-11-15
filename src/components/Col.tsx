import { mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { classname, isObject } from './utils';

const colWidths = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

type StringOrNumber = string | number

type ColumnType = {
  size?: boolean | string | number
  order?: StringOrNumber
  offset? : StringOrNumber
}

type ColumnPropsType = boolean | string | number | ColumnType

export type PropTypes = {
  tag?: any,
  xs?: ColumnPropsType,
  sm?: ColumnPropsType,
  md?: ColumnPropsType,
  lg?: ColumnPropsType,
  xl?: ColumnPropsType,
  xxl?: ColumnPropsType,
  className?: string,
  widths?: number[],
  children?: any
};

const defaultProps = {
  tag: 'div',
  widths: colWidths,
};

export const getColumnSizeClass = (isXs: boolean, colWidth: any, colSize: any) => {
  if (colSize === true || colSize === '') {
    return isXs ? 'col' : `col-${colWidth}`;
  } else if (colSize === 'auto') {
    return isXs ? 'col-auto' : `col-${colWidth}-auto`;
  }

  return isXs ? `col-${colSize}` : `col-${colWidth}-${colSize}`;
};


export const getColumnClasses = (attributes: any, widths=colWidths) => {
  const colClasses: any[] = [];
  
  widths.forEach((colWidth, i) => {
    let columnProp = attributes[colWidth];

    delete attributes[colWidth];

    if (!columnProp && columnProp !== '') {
      return;
    }

    const isXs = !i;

    if (isObject(columnProp)) {
      const colSizeInterfix = isXs ? '-' : `-${colWidth}-`;
      const colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);

      colClasses.push({
        [colClass]: columnProp.size || columnProp.size === '',
        [`order${colSizeInterfix}${columnProp.order}`]: columnProp.order || columnProp.order === 0,
        [`offset${colSizeInterfix}${columnProp.offset}`]: columnProp.offset || columnProp.offset === 0
      });
    } else {
      const colClass = getColumnSizeClass(isXs, colWidth, columnProp);
      colClasses.push(colClass);
    }
  });

  return {
    colClasses,
    attributes
  }
}

export const Col = (props: PropTypes) => {
  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
  ["className", "widths", "tag"]);
  
  const modifiedAttributes = () => getColumnClasses(attributes, local.widths).attributes

  const classes = () => {
    let { colClasses } = getColumnClasses(attributes, local.widths)

    if (!colClasses.length) {
      colClasses.push('col');
    }

    return classname(
      local.className,
      ...colClasses  
    )
  }

  return (
    <Dynamic component={local.tag} {...modifiedAttributes()} class={classes()} />
  );
};
