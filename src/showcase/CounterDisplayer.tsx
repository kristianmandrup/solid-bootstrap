import { useContext } from "solid-js";
import { Dynamic } from "solid-js/web";
import { CounterContext } from "./CounterContextContainer";

export const CounterDisplayer = (props: any) => {
  const [state, { increment, decrement }] = useContext(CounterContext);
  console.log({state, increment, decrement});
  return <Dynamic component={'div'}>
    <span>Count: {(state as any).count}</span><br/>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
  </Dynamic>
}
