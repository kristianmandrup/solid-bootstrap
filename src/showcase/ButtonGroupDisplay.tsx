import { Button, ButtonGroup } from "../components";

export default () => {
  return (
    <div>
      <a href="https://reactstrap.github.io/components/button-group/">Button Group component</a>
      <p/>
      <ButtonGroup>
        <Button color="primary">Left</Button>
        <Button color="danger">Middle</Button>
        <Button>Right</Button>
    </ButtonGroup>
  </div>
  );
}