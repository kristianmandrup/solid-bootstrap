import { createEffect, mergeProps, onCleanup, onMount, splitProps } from "solid-js";
import { Portal as WebPortal } from "solid-js/web";
import { canUseDOM } from './utils';

type PropTypes = {
  children: any,
  node?: any
};

const defaultProps = {}

export const Portal = (props: PropTypes) => {
  let defaultNode: any;

  const [local, attributes] = splitProps(mergeProps(defaultProps, props),
  ["node"]);

  onCleanup(() => {
    if (defaultNode) {
      document.body.removeChild(defaultNode);
    }
    defaultNode = null;
  })

  const appendDefaultNode = () => {
    defaultNode = document.createElement('div');
    document.body.appendChild(defaultNode);
    return defaultNode
  }

  onMount(() => {
    if (!local.node && !defaultNode) {
      appendDefaultNode()
    }  
  })

  const mount = () => local.node || defaultNode

  return canUseDOM ? <WebPortal mount={mount()} {...attributes} /> : null;
}