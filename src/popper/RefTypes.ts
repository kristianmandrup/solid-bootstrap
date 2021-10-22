type RefHandler = (e?: HTMLElement) => void;
type RefObject = { current?: HTMLElement };

export type Ref = RefHandler | RefObject;
