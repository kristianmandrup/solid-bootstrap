import { Spinner } from '../components';

export default () => {
  return (
    <div>
      <a href="https://reactstrap.github.io/?path=/docs/components-spinner--spinner">Spinner docs</a>
      <p/>            
      <Spinner type="grow" color="primary" />
      <Spinner type="grow" color="secondary" />
      <Spinner type="grow" color="success" />
      <Spinner type="grow" color="danger" />
      <Spinner type="grow" color="warning" />
      <Spinner type="grow" color="info" />
      <Spinner type="grow" color="light" />
      <Spinner type="grow" color="dark" />
    </div>
  );
}