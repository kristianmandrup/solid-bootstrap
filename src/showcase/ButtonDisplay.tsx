import { Button } from '../components';

export default ({color = "primary"} : {color?: string}) => {
  return (
    <Button color={color}>Danger!</Button>
  );
};