import { render } from "solid-js/web";
import { createStore } from "solid-js/store";
import { createContext, useContext } from "solid-js";

const AccordionContext = createContext([{open: false}, {} as any]);

export const Accordion = (props: any) => {
  const { open, ...attributes } = props
    const [state, setState] = createStore({ open });
    const store = [
      state,
      {
        toggle() {
          setState({open: !state.open});
        },
      },
    ];

    return (
    <AccordionContext.Provider value={store} {...attributes}>
      {props.children}
    </AccordionContext.Provider>
  );
};

function Header() {
  const [state, { toggle }] = useContext(AccordionContext);
  return <div>
    <h2>{state.open ? 'open' : 'closed'}</h2>
    <button onClick={toggle}>toggle</button>
  </div>;
}

function App() {
  return (
    <>
      <Accordion><Header /></Accordion>
    </>
  );
}

