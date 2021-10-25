import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardLink
} from '../components';

export default () => {
  return (
    <div>
      <Card>
        <CardImg top width="100%" src="http://lorempixel.com/318/180" alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">Card title</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <CardLink >link<br/></CardLink>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
  );
};