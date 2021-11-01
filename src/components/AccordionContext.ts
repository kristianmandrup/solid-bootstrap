import { createContext } from "solid-js";

export const AccordionContext = createContext([
  { open: true } as any,
  {} as any,
] as any);
