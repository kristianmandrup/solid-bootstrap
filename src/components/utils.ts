// https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/js/src/modal.js#L436-L443
export function getScrollbarWidth() {
  let scrollDiv = document.createElement("div");
  // .modal-scrollbar-measure styles // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/scss/_modal.scss#L106-L113
  scrollDiv.style.position = "absolute";
  scrollDiv.style.top = "-9999px";
  scrollDiv.style.width = "50px";
  scrollDiv.style.height = "50px";
  scrollDiv.style.overflow = "scroll";
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}

export function setScrollbarWidth(padding: number) {
  document.body.style.paddingRight = padding > 0 ? `${padding}px` : "";
}

export function isBodyOverflowing() {
  return document.body.clientWidth < window.innerWidth;
}

export function getOriginalBodyPadding() {
  const style = window.getComputedStyle(document.body, null);

  return parseInt(
    (style && style.getPropertyValue("padding-right")) || "0",
    10
  );
}

export function conditionallyUpdateScrollbar() {
  const scrollbarWidth = getScrollbarWidth();
  // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.6/js/src/modal.js#L433
  const fixedContent: any = document.querySelectorAll(
    ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
  )[0];
  const bodyPadding = fixedContent
    ? parseInt(fixedContent.style.paddingRight || 0, 10)
    : 0;

  if (isBodyOverflowing()) {
    setScrollbarWidth(bodyPadding + scrollbarWidth);
  }
}

/**
 * Returns a new object with the key/value pairs from `obj` that are not in the array `omitKeys`.
 */
export function omit(obj: any, omitKeys: string[]) {
  const result: any = {};
  Object.keys(obj).forEach((key) => {
    if (omitKeys.indexOf(key) === -1) {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * Returns a filtered copy of an object with only the specified keys.
 */
export function pick(obj: any, keys: any) {
  const pickKeys = Array.isArray(keys) ? keys : [keys];
  let length = pickKeys.length;
  let key;
  const result: any = {};

  while (length > 0) {
    length -= 1;
    key = pickKeys[length];
    result[key] = obj[key];
  }
  return result;
}

let warned: any = {};

export function warnOnce(message: string) {
  if (!warned[message]) {
    /* istanbul ignore else */
    if (typeof console !== "undefined") {
      console.error(message); // eslint-disable-line no-console
    }
    warned[message] = true;
  }
}

export function deprecated(propType: any, explanation: string) {
  return function validate(
    props: any,
    propName: string,
    componentName: string,
    ...rest: any[]
  ) {
    if (props[propName] !== null && typeof props[propName] !== "undefined") {
      warnOnce(
        `"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`
      );
    }

    return propType(props, propName, componentName, ...rest);
  };
}

// Shim Element if needed (e.g. in Node environment)
const Element =
  (typeof window === "object" && window.Element) || function () {};

export function DOMElement(
  props: any,
  propName: string,
  componentName: string
) {
  if (!(props[propName] instanceof Element)) {
    return new Error(
      "Invalid prop `" +
        propName +
        "` supplied to `" +
        componentName +
        "`. Expected prop to be an instance of Element. Validation failed."
    );
  }
}

/* eslint key-spacing: ["error", { afterColon: true, align: "value" }] */
// These are all setup to match what is in the bootstrap _variables.scss
// https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss
export const TransitionTimeouts = {
  Fade: 150, // $transition-fade
  Collapse: 350, // $transition-collapse
  Modal: 300, // $modal-transition
  Carousel: 600, // $carousel-transition
  Offcanvas: 300, // $offcanvas-transition
};

// Duplicated Transition.propType keys to ensure that Reactstrap builds
// for distribution properly exclude these keys for nested child HTML attributes
// since `react-transition-group` removes propTypes in production builds.
export const TransitionPropTypeKeys = [
  "in",
  "mountOnEnter",
  "unmountOnExit",
  "appear",
  "enter",
  "exit",
  "timeout",
  "onEnter",
  "onEntering",
  "onEntered",
  "onExit",
  "onExiting",
  "onExited",
];

export const TransitionStatuses = {
  ENTERING: "entering",
  ENTERED: "entered",
  EXITING: "exiting",
  EXITED: "exited",
};

export const keyCodes = {
  esc: 27,
  space: 32,
  enter: 13,
  tab: 9,
  up: 38,
  down: 40,
  home: 36,
  end: 35,
  n: 78,
  p: 80,
};

export const PopperPlacements = [
  "auto-start",
  "auto",
  "auto-end",
  "top-start",
  "top",
  "top-end",
  "right-start",
  "right",
  "right-end",
  "bottom-end",
  "bottom",
  "bottom-start",
  "left-end",
  "left",
  "left-start",
];

export const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

export function isReactRefObj(target: any) {
  if (target && typeof target === "object") {
    return "current" in target;
  }
  return false;
}

function getTag(value: any) {
  if (value == null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  return Object.prototype.toString.call(value);
}

export function toNumber(value: any) {
  const type = typeof value;
  const NAN = 0 / 0;
  if (type === "number") {
    return value;
  }
  if (
    type === "symbol" ||
    (type === "object" && getTag(value) === "[object Symbol]")
  ) {
    return NAN;
  }
  if (isObject(value)) {
    const other = typeof value.valueOf === "function" ? value.valueOf() : value;
    value = isObject(other) ? `${other}` : other;
  }
  if (type !== "string") {
    return value === 0 ? value : +value;
  }
  value = value.replace(/^\s+|\s+$/g, "");
  const isBinary = /^0b[01]+$/i.test(value);
  return isBinary || /^0o[0-7]+$/i.test(value)
    ? parseInt(value.slice(2), isBinary ? 2 : 8)
    : /^[-+]0x[0-9a-f]+$/i.test(value)
    ? NAN
    : +value;
}

export function isObject(value: any) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
}

export function isFunction(value: any) {
  if (!isObject(value)) {
    return false;
  }

  const tag = getTag(value);
  return (
    tag === "[object Function]" ||
    tag === "[object AsyncFunction]" ||
    tag === "[object GeneratorFunction]" ||
    tag === "[object Proxy]"
  );
}

export function findDOMElements(target: any) {
  if (isReactRefObj(target)) {
    return target.current;
  }
  if (isFunction(target)) {
    return target();
  }
  if (typeof target === "string" && canUseDOM) {
    let selection = document.querySelectorAll(target);
    if (!selection.length) {
      selection = document.querySelectorAll(`#${target}`);
    }
    if (!selection.length) {
      throw new Error(
        `The target '${target}' could not be identified in the dom, tip: check spelling`
      );
    }
    return selection;
  }
  return target;
}

export function isArrayOrNodeList(els: any) {
  if (els === null) {
    return false;
  }
  return Array.isArray(els) || (canUseDOM && typeof els.length === "number");
}

export function getTarget(target: any, allElements?: any) {
  const els = findDOMElements(target);
  if (allElements) {
    if (isArrayOrNodeList(els)) {
      return els;
    }
    if (els === null) {
      return [];
    }
    return [els];
  } else {
    if (isArrayOrNodeList(els)) {
      return els[0];
    }
    return els;
  }
}

export const defaultToggleEvents = ["touchstart", "click"];

export const objClassnames = (obj: any): string[] => {
  return Object.keys(obj).reduce((acc: string[], key: string) => {
    const val = obj[key];
    const className = val ? key : null;
    className && acc.push(className);
    return acc;
  }, [] as string[]);
};

export const classnamesFor = (arg: any): string[] | string => {
  if (isObject(arg)) return objClassnames(arg);
  if (Array.isArray(arg)) return arg.map(classnamesFor).flat();
  if (typeof arg !== "string") {
    return "";
  }
  return arg as string;
};

const noEmpty = (a: any) =>
  a !== undefined && a !== null && a !== "" && a !== false;

export const classnames = (...args: any[]): string[] => {
  const isFirstArr = Array.isArray(args[0]);
  let $args = isFirstArr ? args[0].flat() : args;
  $args = $args.filter(noEmpty);
  return $args.map(classnamesFor).flat().filter(noEmpty);
};

export const classname = (...args: any[]) => {
  return classnames(args).join(" ");
};

let globalCssModule: any;

export type doneFn = () => void;

export interface TransitionPropTypes {
  onEnter?: (node: any) => void;
  onEntering?: (node: any) => void;
  onEntered?: (node: any) => void;
  onExit?: (node: any) => void;
  onExiting?: (node: any) => void;
  onExited?: (node: any) => void;
}

export function setGlobalCssModule(cssModule: any) {
  globalCssModule = cssModule;
}

export function mapToCssModules(className = "", cssModule = globalCssModule) {
  if (!cssModule) return className;
  return className
    .split(" ")
    .map((c) => cssModule[c] || c)
    .join(" ");
}

export const styleToString = (style: any) => {
  return Object.keys(style).reduce(
    (acc, key) =>
      acc +
      key
        .split(/(?=[A-Z])/)
        .join("-")
        .toLowerCase() +
      ":" +
      style[key] +
      ";",
    ""
  );
};

export function addMultipleEventListeners(
  _els: any,
  handler: any,
  _events: any,
  useCapture?: boolean
) {
  let els = _els;
  if (!isArrayOrNodeList(els)) {
    els = [els];
  }

  let events = _events;
  if (typeof events === "string") {
    events = events.split(/\s+/);
  }

  if (
    !isArrayOrNodeList(els) ||
    typeof handler !== "function" ||
    !Array.isArray(events)
  ) {
    throw new Error(`
      The first argument of this function must be DOM node or an array on DOM nodes or NodeList.
      The second must be a function.
      The third is a string or an array of strings that represents DOM events
    `);
  }

  Array.prototype.forEach.call(events, (event) => {
    Array.prototype.forEach.call(els, (el) => {
      el.addEventListener(event, handler, useCapture);
    });
  });
  return function removeEvents() {
    Array.prototype.forEach.call(events, (event) => {
      Array.prototype.forEach.call(els, (el) => {
        el.removeEventListener(event, handler, useCapture);
      });
    });
  };
}

export const focusableElements = [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type=hidden])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "object",
  "embed",
  "[tabindex]:not(.modal)",
  "audio[controls]",
  "video[controls]",
  '[contenteditable]:not([contenteditable="false"])',
];
