import { createSignal } from 'solid-js';
import { Alert } from './Alert';

export const UncontrolledAlert = (props: any) => {
  const [isOpen, setOpen] = createSignal(true)

  const toggle = () => {
    setOpen(!isOpen)
  }

  return <Alert isOpen={isOpen()} toggle={toggle} {...props} />;
}