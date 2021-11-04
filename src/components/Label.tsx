import { mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { classname, isObject } from './utils';

const colWidths = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

type StringOrNumber = number | string

type ColType = {
  size: StringOrNumber,
  order: StringOrNumber,
  offset: StringOrNumber,
}

type ColumnPropsType = boolean |
  string |
  number |
  ColType


type PropTypes = {
  children?: any,
  hidden?: boolean,
  check?: boolean,
  size?: string,
  for?: string,
  tag?: any,
  className?: string,
  xs?: ColumnPropsType,
  sm?: ColumnPropsType,
  md?: ColumnPropsType,
  lg?: ColumnPropsType,
  xl?: ColumnPropsType,
  xxl?: ColumnPropsType,
  widths?: number[],
};

const defaultProps = {
  tag: 'label',
  widths: colWidths,
};

const getColumnSizeClass = (isXs: boolean, colWidth: any, colSize: any) => {
  if (colSize === true || colSize === '') {
    return isXs ? 'col' : `col-${colWidth}`;
  } else if (colSize === 'auto') {
    return isXs ? 'col-auto' : `col-${colWidth}-auto`;
  }

  return isXs ? `col-${colSize}` : `col-${colWidth}-${colSize}`;
};

export const Label = (props: PropTypes) => {
  const [local, attributes]: any = splitProps(mergeProps(props, defaultProps),
  ["className", "tag", "hidden", "widths", "check", "size", "for"]);
  
  const colClasses = (): any[] => {
    let colClasses: any[] = [] 

    local.widths.forEach((colWidth: any, i: number) => {
      let columnProp = attributes[colWidth];

      delete attributes[colWidth];

      if (!columnProp && columnProp !== '') {
        return;
      }

      const isXs = !i;
      let colClass;

      if (isObject(columnProp)) {
        const colSizeInterfix = isXs ? '-' : `-${colWidth}-`;
        colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);

        colClasses.push({
          [colClass]: columnProp.size || columnProp.size === '',
          [`order${colSizeInterfix}${columnProp.order}`]: columnProp.order || columnProp.order === 0,
          [`offset${colSizeInterfix}${columnProp.offset}`]: columnProp.offset || columnProp.offset === 0
        });
      } else {
        colClass = getColumnSizeClass(isXs, colWidth, columnProp);
        colClasses.push(colClass);
      }
    });
    return colClasses
  }

  const classes = () => {
    const colcls = colClasses() 
    return classname(
      local.className,
      local.hidden ? 'visually-hidden' : false,
      local.check ? 'form-check-label' : false,
      local.size ? `col-form-label-${local.size}` : false,
      colcls,
      colcls.length ? 'col-form-label' : 'form-label'
      )
    }

  return (
    <Dynamic 
      component={local.tag} 
      htmlFor={local.for} 
      {...attributes} 
      class={classes()} />
  );
};