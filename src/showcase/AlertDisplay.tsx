import { Alert } from '../components'

export default ({color = "primary"} : {color?: string}) => <div>
<a href="https://reactstrap.github.io/?path=/docs/components-alert--alert">Alert docs</a>
<Alert color={color} fade={false}>
This is an alert
</Alert>
<Alert color={color}>
This is a hidden (faded) alert
</Alert></div>
