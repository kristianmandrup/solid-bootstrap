import { InputGroup, InputGroupText, Input } from '../components';

export default () => {
  return (
    <div>
        <a href="https://reactstrap.github.io/?path=/docs/components-forms--input">Input docs</a>
        <p/>      

        <Input placeholder="username" />
      <br />
        <Input placeholder="Amount" min={0} max={100} type="number" step="1" />
    </div>
  );
};