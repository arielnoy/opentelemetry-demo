import fs from 'fs';


let lastMinutes = 2;
let ServiceName = 'frontend-proxy';
let host = 'localhost:8080';
if (process.argv.length > 2) {
    host = process.argv[2];
    ServiceName = 'frontendproxy';
    lastMinutes = 3;
}

let currentTime = Date.now();
let fiveMinutesAgo = new Date(currentTime - lastMinutes * 60 * 1000);

let currentTimeString = currentTime.toString()+ '000';
let fiveMinutesAgoString = fiveMinutesAgo.getTime().toString() + '000';
let url = 'http://'+host+'/jaeger/ui/api/traces?end='+currentTimeString+'&limit=50000&lookback='+lastMinutes+'m&maxDuration&minDuration&service='+ServiceName+'&start='+fiveMinutesAgoString;
console.log(url);
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Process the fetched data here
        //console.log(JSON.stringify(data, null, 4));
        // save the data to a file for further analysis
        fs.writeFileSync('./backup/data.'+currentTime.toString()+'.json', JSON.stringify(data, null, 4));

    })
    .catch(error => {
        // Handle any errors that occur during the fetch
        console.error(error);
    });

