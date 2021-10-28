import { ManagerReferenceNodeContext } from './Manager';
import { safeInvoke, unwrapArray, setRef } from './utils';
import type { Ref } from './RefTypes';
import { createEffect, onCleanup, useContext } from 'solid-js';

export type ReferenceChildrenProps = { ref: Ref }
export type ReferenceProps = {
  children: (props?: ReferenceChildrenProps) => any,
  innerRef?: Ref,
}

export const Reference = ({ children, innerRef }: ReferenceProps): any => {
  const [state, {setRefNode}] = useContext(ManagerReferenceNodeContext);
  
  createEffect(() => {
      setRef(innerRef, state.refNode);
      safeInvoke(setRefNode, state.refNode);
    }
  );

  onCleanup(() => {
    // run on unmount
    setRef(innerRef, null)
  });

  return unwrapArray(children)({ref: state.refNode});
}