import { createContext, createEffect, createSignal } from "solid-js";

export const ManagerReferenceNodeContext = createContext();
export const ManagerReferenceNodeSetterContext = createContext();

export type ManagerProps = {
  children: any,
};

export const Manager = ({ children }: ManagerProps) => {
  const [referenceNode, setReferenceNode] = createSignal(null);

  const hasUnmounted: any = {};
  createEffect(() => {
    return () => {
      hasUnmounted.current = true;
    };
  });

  // call from createEffect
  const handleSetReferenceNode = (node: any) => {
    if (!hasUnmounted.current) {
      setReferenceNode(node);
    }
  };

  return (
    <ManagerReferenceNodeContext.Provider value={referenceNode}>
      <ManagerReferenceNodeSetterContext.Provider
        value={handleSetReferenceNode}
      >
        {children}
      </ManagerReferenceNodeSetterContext.Provider>
    </ManagerReferenceNodeContext.Provider>
  );
}