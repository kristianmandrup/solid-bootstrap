import { createSignal } from 'solid-js';
import { Collapse, Button, CardBody, Card } from '../components';

export default () => {
  const [collapse, setCollapse] = createSignal(false);
  const [status, setStatus] = createSignal('Closed');

  const onEntering = () => setStatus('Opening...');

  const onEntered = () => setStatus('Opened');

  const onExiting = () => setStatus('Closing...');

  const onExited = () => setStatus('Closed');

  const toggle = () => setCollapse(!collapse);

  return (
    <div>
      <a href="https://reactstrap.github.io/?path=/docs/components-collapse--collapse">Collapse docs</a>
      <p/>      
      <Button color="primary" onClick={toggle} style={"marginBottom: '1rem'"}>Toggle</Button>
      <h5>Current state: {status}</h5>
      <Collapse
        isOpen={collapse()}
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        onExited={onExited}
      >
        <Card>
          <CardBody>
            Anim pariatur cliche reprehenderit,
           enim eiusmod high life accusamus terry richardson ad squid. Nihil
           anim keffiyeh helvetica, craft beer labore wes anderson cred
           nesciunt sapiente ea proident.
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}