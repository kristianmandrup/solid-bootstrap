import { createSignal } from 'solid-js';
import { Button, Fade } from '../components';

export default () => {
    const [fadeIn, setFadeIn] = createSignal(true);

    const toggle = () => setFadeIn(!fadeIn);

    return (
        <div>
            <Button color="primary" onClick={toggle}>Toggle Fade</Button>
            <Fade in={fadeIn()} tag="h5" className="mt-3">
                This content will fade in and out as the button is pressed
            </Fade>
        </div>
    );
}