import { Media } from '../components';

export default () => {
  return (
    <div>
      <a href="https://reactstrap.github.io/components/media/">Media</a>    
      <Media>
        <Media left href="">
          <Media object src="http://lorempixel.com/64/64" alt="Generic placeholder image" />
        </Media>
        <Media body>
          <Media heading>
            Media heading
          </Media>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
        </Media>
      </Media>
    </div>
  );
};