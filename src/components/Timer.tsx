import '../App.css';
import { useStopwatch } from 'react-timer-hook';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, InputGroup, FormControl, Alert} from 'react-bootstrap';
import { useEffect, useState } from 'react';

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
    const [startUrl, setStartUrl] = useState("");
    const [endUrl, setEndUrl] = useState("");
    const [error, setError] = useState({
        hasError: false,
        errorMessage: ""
    });

    async function getCurrentTab() {
        let queryOptions = { active: true, lastFocusedWindow: true };
        // `tab` will either be a `tabs.Tab` instance or `undefined`.
        let [tab] = await chrome.tabs.query(queryOptions);
        let url = tab.url;
        return url;
    }

    async function validateStartLink() {
        let url = await getCurrentTab();
        if (url !== startUrl) {
            setError({
                hasError: true,
                errorMessage: "Start link must match current tab"
            });
        } else {
            setError({
                hasError: false,
                errorMessage: ""
            });
            start();
        }
    }

    function rndmLinks() {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET",  "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&grnlimit=2" , false ); // false for synchronous request
        xmlHttp.send( null );
        var json = JSON.parse(xmlHttp.responseText);
        setStartUrl("http://en.wikipedia.org/?curid=" + json.query.pages[Object.keys(json.query.pages)[0]].pageid);
        setEndUrl("http://en.wikipedia.org/?curid=" + json.query.pages[Object.keys(json.query.pages)[1]].pageid);
        window.open("http://en.wikipedia.org/?curid=" + json.query.pages[Object.keys(json.query.pages)[0]].pageid, "self")
    }

    return (
        <div className="App">
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Start Link</InputGroup.Text>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={startUrl} onChange={(e)=>{
                        setStartUrl(e.target.value);
                    }} />
                </InputGroup>

                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">End Link</InputGroup.Text>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={endUrl} onChange={(e)=>{
                        setEndUrl(e.target.value);
                    }}/>
                </InputGroup>

                <span><h2>{nf(minutes)}:{nf(seconds)}</h2></span>
               { error.hasError === false ? "" :  <Alert key="danger" variant="danger">
                    {error.errorMessage}
                </Alert>}
                <span>
                    <Button onClick={()=>{
                        validateStartLink();
                        }} variant="primary">Start</Button>
                    <Button onClick={pause} variant="primary">Stop</Button>
                </span>

                <span>
                    <Button onClick={()=>{rndmLinks();}} variant="primary">
                        rndm
                    </Button>
                </span>
        </div>
    );
}