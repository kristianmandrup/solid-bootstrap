import { createContext } from "solid-js";
import { createStore } from "solid-js/store";
import { CounterDisplayer } from "./CounterDisplayer";

export const CounterContext = createContext([{ count: 0 } as {count: number}, {} as any]);

export default function CounterProvider(props: any) {
  const [state, setState] = createStore({ count: props.count || 0 } as {count: number});
  const store = [
    state,
    {
      increment() {
        setState("count", (c: number) => c + 1);
      },
      decrement() {
        setState("count", (c: number) => c - 1);
      },
    },
  ];

  return (
    <div>
      <h2>Counter</h2>
      <CounterContext.Provider value={store}>
        <CounterDisplayer />
      </CounterContext.Provider>
    </div>
  );
}