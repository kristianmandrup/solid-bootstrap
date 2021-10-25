import { InputGroup, InputGroupText, Input } from '../components';

export default () => {
  return (
    <div>
        <Input placeholder="username" />
      <br />
        <Input placeholder="Amount" min={0} max={100} type="number" step="1" />
    </div>
  );
};