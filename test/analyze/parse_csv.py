# parse the following csv file and print the data in the following format
# csv looks like this:
# startTime,user_agent,http_url,http_status_code,http_method,duration,traceID,spanID,operationName,logs,serviceName
# 1709138846913605,Test 8,http://localhost:8080/api/products?currencyCode=,200,GET,3483,ce5567c3803c8a45c7b2296784ce1951,c65d452b3ed693d2,router frontend egress,frontend-proxy
#
# output should look like this:
# number of occurs for every user_agent and http_url combination
# user_agent,http_url,occurs
# Test 8,http://localhost:8080/api/products?currencyCode=,1
#
# number of occurs for every user_agent and http_url combination
# user_agent,http_url,occurs
# Test 8,http://localhost:8080/api/products?currencyCode=,1
import csv
from collections import defaultdict
import sys

# Check if there is at least one argument
if len(sys.argv) > 1:
    filename = sys.argv[1]
    print(filename)
else:
    print("No filename provided")

with open(filename, mode='r') as file:
    csv_reader = csv.DictReader(file)
    data = []
    for row in csv_reader:
        # if the operationName start with fs then skip the row
        if row['operationName'].startswith('fs'):
            continue
        data.append(row)

    result = defaultdict(int)
    for d in data:
        result[(d['user_agent'], d['http_url'], d['traceID'])] += 1

    print('number of occurs for every user_agent and http_url combination')
    print('user_agent,http_url,occurs')
    for k, v in result.items():
        print(f'{k[0]},{k[1]},{k[2]},{v}')
    print()
