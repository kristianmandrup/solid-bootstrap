import { createContext } from "solid-js";

export const AccordionContext = createContext([
  { open: false } as any,
  {} as any,
] as any);
