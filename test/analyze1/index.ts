
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('ts-node/esm', pathToFileURL('./'));

import { exit } from 'process';
import { fetch } from 'node-fetch';


console.log('Hello, world!');


let currentTime = new Date();
let formattedTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
console.log(formattedTime);  // Output: "HH:MM:SS"

exit();
fetch('http://localhost:8080/jaeger/ui/api/traces?end=1708858927763000&limit=50&lookback=5m&maxDuration&minDuration&service=frontend-web&start=170885')
    .then(response => response.json())
    .then(data => {
        // Process the fetched data here
        console.log(data);
    })
    .catch(error => {
        // Handle any errors that occur during the fetch
        console.error(error);
    });

