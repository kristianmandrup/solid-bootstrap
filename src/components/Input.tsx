import { mergeProps, splitProps } from 'solid-js';
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
  ref?: any
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
  const [local, attributes] = splitProps(mergeProps(props, defaultProps),
  ["className", "tag", "type", "bsSize", "valid",
  "invalid", "addon", "plaintext", "ref"]);

  const checkInput = ['switch', 'radio', 'checkbox'].indexOf(local.type) > -1;
  const isNotaNumber = new RegExp('\\D', 'g');

  const textareaInput = local.type === 'textarea';
  const selectInput = local.type === 'select';
  const rangeInput = local.type === 'range';
  const tag = () => local.tag || (selectInput || textareaInput ? local.type : 'input');

  const formControlClass = () => {
    const ctrlClass = 'form-control';

    if (local.plaintext) {
      local.tag = local.tag || 'input';
      return `${ctrlClass}-plaintext`;    
    } else if (rangeInput) {
      return 'form-range';
    } else if (selectInput) {
      return "form-select";
    } else if (checkInput) {
      if (local.addon) {
        return null;
      } else {
        return 'form-check-input';
      }
    }
  }

  if (attributes.size && isNotaNumber.test('' + attributes.size)) {
    warnOnce(
      'Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.'
    );
    local.bsSize = '' + attributes.size;
    delete attributes.size;
  }

  const classes = () => classname(
    local.className,
    local.invalid && 'is-invalid',
    local.valid && 'is-valid',
    local.bsSize
      ? selectInput
        ? `form-select-${local.bsSize}`
        : `form-control-${local.bsSize}`
      : false,
    formControlClass()
  )

  let type;

  const setAttribs = () => {
    const $tag = tag()

    if (local.tag === 'input' || ($tag && typeof $tag === 'function')) {
      type = local.type === 'switch' ? 'checkbox' : local.type;
    }  
  
    
    const canHaveNoChildren = () => attributes.children &&
    !(
      local.plaintext ||
      local.type === 'select' ||
      typeof $tag !== 'string' ||
      $tag === 'select'
    )

    if (canHaveNoChildren()) {
      warnOnce(
        `Input with a type of "${local.type}" cannot have children. Please use "value"/"defaultValue" instead.`
      );
      delete attributes.children;
    }
    return true
  }

  return <Dynamic 
    component={tag()} 
    {...(setAttribs() && attributes)} 
    ref={local.ref} 
    type={type}
    class={classes()} 
    aria-invalid={local.invalid}>
  </Dynamic>
}
