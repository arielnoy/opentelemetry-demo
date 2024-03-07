import fs from 'fs';

import _ from 'lodash';
import XRegExp from 'xregexp';


//filename is argv[0]
let filename = process.argv[2];
let data_file = fs.readFileSync(filename, 'utf8');
let data = JSON.parse(data_file);
let csv_filename = filename.replace('.json', '.csv');

// loop through the data and get the trace id
//console.log('startTime,user_agent,http_url,http_status_code,http_method,duration,traceID,spanID,operationName,serviceName');
fs.appendFileSync(csv_filename, 'startTime,user_agent,http_url,http_status_code,http_method,duration,traceID,spanID,operationName,serviceName' + '\n');
for (let i = 0; i < data.data.length; i++) {
    //console.log(data.data[i].traceID);
    let span = data.data[i].spans;
    let useragent = 'Unknown User Agent';
    let http_url = '';
    let http_status_code = '';
    let http_method = '';
    let spanIDs = {};
    for (let j = 0; j < span.length; j++) {
        let tags = span[j].tags;
        http_url = '';
        http_status_code = '';
        http_method = '';
        for (let k = 0; k < tags.length; k++) {
            if ( (tags[k].key === 'http.user_agent' ) && (! (tags[k].value).startsWith('Go') ) && (tags[k].value) != "" ) {
                useragent = tags[k].value;
            } else if (tags[k].key === 'http.url') {
                http_url = tags[k].value;
                // replace the id with xID string
                http_url = XRegExp.replace(http_url, XRegExp('([0-9a-fA-F]{4,12}-)+[0-9a-fA-F]{4,12}'), 'xID');
            } else if (tags[k].key === 'http.status_code') {
                http_status_code = tags[k].value;
            } else if (tags[k].key === 'http.method') {
                http_method = tags[k].value;
            }
        }
        spanIDs[span[j].spanID] = {
            startTime: span[j].startTime,
            duration: span[j].duration,
            operationName: span[j].operationName,
            processID: span[j].processID,
            traceID: span[j].traceID,
            spanID: span[j].spanID,
            http_url: http_url,
            http_status_code: http_status_code,
            http_method: http_method,
            sourceSpan: span[j]
        };
    }

    for (let j = 0; j < span.length; j++) {
        let processID = span[j].processID;
        let serviceName = data.data[i].processes[processID].serviceName;
        http_url = spanIDs[span[j].spanID].http_url;
        http_status_code = spanIDs[span[j].spanID].http_status_code;
        http_method = spanIDs[span[j].spanID].http_method;
        let current_span = span[j];
        while (current_span.references.length > 0 && current_span.references[0].refType === 'CHILD_OF') {
            let parentSpanID = current_span.references[0].spanID;
            if (spanIDs[parentSpanID] !== undefined) {
                http_url = spanIDs[parentSpanID].http_url;
                http_status_code = spanIDs[parentSpanID].http_status_code;
                http_method = spanIDs[parentSpanID].http_method;
                current_span = spanIDs[parentSpanID].sourceSpan;
            } else {
                break;
            }
        }
        let logs_line = span[j].startTime + ',' + useragent + ','+ http_url + ',' + http_status_code + ',' + http_method + ',' + span[j].duration + ','
            + span[j].traceID + ',' + span[j].spanID + ',' + span[j].operationName + ',' 
            + serviceName;
        //console.log(logs_line);
        fs.appendFileSync(csv_filename, logs_line + '\n');
    }
}

