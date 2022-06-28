import '../App.css';
import { useStopwatch } from 'react-timer-hook';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, InputGroup, FormControl} from 'react-bootstrap';

//Build with: INLINE_RUNTIME_CHUNK=false npm run build
export default function Timer() {
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });

    const nf = (number: string | number) => number >= 10 ? number : "0"+number

    return (
        <div className="App">
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Start Link</InputGroup.Text>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>

                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">End Link</InputGroup.Text>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>

                <span><h2>{nf(minutes)}:{nf(seconds)}</h2></span>
                <span>
                    <Button onClick={start} variant="primary">Start</Button>
                    <Button onClick={pause} variant="primary">Stop</Button>
                </span>
        </div>
    );
}