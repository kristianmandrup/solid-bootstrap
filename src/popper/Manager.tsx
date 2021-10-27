import { createContext, createEffect, createSignal } from "solid-js";

export const ManagerReferenceNodeContext = createContext([null] as any);

export type ManagerProps = {
  children: any,
};

export const Manager = ({ children }: ManagerProps) => {
  const [referenceNode, setReferenceNode] = createSignal(null);
  const referenceNodeStore = [
    referenceNode, 
    {
      setReferenceNode,
      handleSetReferenceNode(node: any) {
        if (!hasUnmounted.current) {
          setReferenceNode(node);
        }
      }      
    }
  ]


  const hasUnmounted: any = {};
  createEffect(() => {
    return () => {
      hasUnmounted.current = true;
    };
  });

  return (
    <ManagerReferenceNodeContext.Provider value={referenceNodeStore}>
        {children}
    </ManagerReferenceNodeContext.Provider>
  );
}