import { Button } from '../components';

export default ({color = "primary"} : {color?: string}) => 
<div>
  <a href="https://reactstrap.github.io/?path=/docs/components-button--button">Button docs</a>
  <Button color={color}>Danger!</Button>
</div>
