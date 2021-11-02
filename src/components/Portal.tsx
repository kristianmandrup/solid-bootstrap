import { onCleanup } from "solid-js";
import { Portal as WebPortal } from "solid-js/web";
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
  const mount = props.node || defaultNode
  return <WebPortal children={props.children} mount={mount} />
}