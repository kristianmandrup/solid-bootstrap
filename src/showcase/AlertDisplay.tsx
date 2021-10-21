import { Alert } from '../components'

export default ({color = "primary"} : {color?: string}) => <Alert color={color}>
This is an alert: See <a href="https://reactstrap.github.io/components/alerts/" className="alert-link">Alert component</a>
</Alert>
