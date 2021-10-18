import { onCleanup } from "solid-js";
import { canUseDOM } from './utils';

type PropTypes = {
  children: any,
  node?: any
};

export const Portal = (props: PropTypes) => {
  let defaultNode: any;
  onCleanup(() => {
    if (defaultNode) {
      document.body.removeChild(defaultNode);
    }
    defaultNode = null;
  })

    if (!canUseDOM) {
      return null;
    }

    if (!props.node && !defaultNode) {
      defaultNode = document.createElement('div');
      document.body.appendChild(defaultNode);
    }

    return <Portal {...props.children}>{props.node || defaultNode}</Portal>
  }