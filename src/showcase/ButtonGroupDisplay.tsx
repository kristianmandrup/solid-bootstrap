import { Button, ButtonGroup } from "../components";

export default () => {
  return (
    <div>
      <a href="https://reactstrap.github.io/?path=/docs/components-button--button-group">Button Group docs</a>    
      <p/>
      <ButtonGroup>
        <Button color="primary">Left</Button>
        <Button color="danger">Middle</Button>
        <Button>Right</Button>
    </ButtonGroup>
  </div>
  );
}