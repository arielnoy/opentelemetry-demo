#!/bin/bash

#node --loader ts-node/esm index.ts   > test.txt
npm start > test.txt 2>/dev/null
for i in $(seq 0 9); do echo $i;export i ;cat test.txt | sort | grep "Test $i" > out_$i.txt ;  done
for i in $(seq 0 9); do echo -n "$i " ; cat out_${i}.txt | grep cartservice  | wc ; done
