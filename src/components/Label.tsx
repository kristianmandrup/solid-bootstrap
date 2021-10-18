import { isObject } from './utils';

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
  sm: ColumnPropsType,
  md: ColumnPropsType,
  lg: ColumnPropsType,
  xl: ColumnPropsType,
  xxl: ColumnPropsType,
  widths: number[],
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
  const {
    className,
    hidden,
    widths,
    tag: Tag,
    check,
    size,
    for: htmlFor,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const colClasses: any[] = [];

  widths.forEach((colWidth: any, i: number) => {
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

  const classes = [
    className,
    hidden ? 'visually-hidden' : false,
    check ? 'form-check-label' : false,
    size ? `col-form-label-${size}` : false,
    colClasses,
    colClasses.length ? 'col-form-label' : 'form-label'
  ]

  return (
    <Tag htmlFor={htmlFor} {...attributes} className={classes} />
  );
};