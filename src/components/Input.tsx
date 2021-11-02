import { Dynamic } from 'solid-js/web';
import { classname, warnOnce } from './utils';

type PropTypes = {
  children?: any,
  type?: string,
  size?: number | string,
  bsSize?: string,
  valid?: boolean,
  invalid?: boolean,
  tag?: any,
  innerRef?: any
  plaintext?: boolean,
  addon?: boolean,
  className?: string,
  name?: string
  id?: string
  placeholder?: string
  multiple?: boolean
  disabled?: boolean
  min?: number | string,
  max?: number | string,
  step?: number | string,
};

const defaultProps = {
  type: 'text'
};

export const Input = (props: PropTypes) => {
  let ref: any;
  const getRef = ($ref: any) => {
    if (props.innerRef) {
      props.innerRef($ref);
    }
    ref = $ref;
  }

  const focus = () => {
    if (ref) {
      ref.focus();
    }
  }

  let {
    className,
    type,
    bsSize,
    valid,
    invalid,
    tag,
    addon,
    plaintext,
    innerRef,
    ...attributes
  } = {
    ...defaultProps,
    ...props
  } as any

  const checkInput = ['switch', 'radio', 'checkbox'].indexOf(type) > -1;
  const isNotaNumber = new RegExp('\\D', 'g');

  const textareaInput = type === 'textarea';
  const selectInput = type === 'select';
  const rangeInput = type === 'range';
  tag = tag || (selectInput || textareaInput ? type : 'input');

  let formControlClass: any = 'form-control';

  if (plaintext) {
    formControlClass = `${formControlClass}-plaintext`;
    tag = tag || 'input';
  } else if (rangeInput) {
    formControlClass = 'form-range';
  } else if (selectInput) {
    formControlClass = "form-select";
  } else if (checkInput) {
    if (addon) {
      formControlClass = null;
    } else {
      formControlClass = 'form-check-input';
    }
  }

  if (attributes.size && isNotaNumber.test(attributes.size)) {
    warnOnce(
      'Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.'
    );
    bsSize = attributes.size;
    delete attributes.size;
  }

  const classes = classname(
      className,
      invalid && 'is-invalid',
      valid && 'is-valid',
      bsSize
        ? selectInput
          ? `form-select-${bsSize}`
          : `form-control-${bsSize}`
        : false,
      formControlClass
  )

  if (tag === 'input' || (tag && typeof tag === 'function')) {
    attributes.type = type === 'switch' ? 'checkbox' : type;
  }

  const canHaveNoChildren = attributes.children &&
  !(
    plaintext ||
    type === 'select' ||
    typeof tag !== 'string' ||
    tag === 'select'
  )

  if (canHaveNoChildren) {
    warnOnce(
      `Input with a type of "${type}" cannot have children. Please use "value"/"defaultValue" instead.`
    );
    delete attributes.children;
  }

  return <Dynamic 
    component={tag} 
    {...attributes} 
    ref={innerRef} 
    class={classes} 
    aria-invalid={invalid}>
  </Dynamic>
}
