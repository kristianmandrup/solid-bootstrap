import { createContext, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

export const ManagerReferenceNodeContext = createContext([{} as any, {} as any] as any);

export type ManagerProps = {
  children: any,
};

export const Manager = ({ children }: ManagerProps) => {
  const [state, setState] = createStore({});
  const store = [
    state, 
    {
      setState,
      setRefNode(node: any) {
        if (!hasUnmounted.current) {
          setState({refNode: node});
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
    <ManagerReferenceNodeContext.Provider value={store}>
        {children}
    </ManagerReferenceNodeContext.Provider>
  );
}