#docker compose stop load-generator
cd /Users/arielnoy/test/opentelemetry-demo
echo "Stopping all services"
services_str="frontend-proxy frontend checkout-service recommendation-service accounting-service product-catalog-service frauddetection-service quote-service payment-service shipping-service cart-service ad-service currency-service email-service feature-flag-service redis-cart"
IFS=', ' read -r -a services <<< "$services_str"
for i in "${services[@]}"; do 
    echo "Stopping $i"
    docker  stop $i &
done 
echo "Waiting for all services to stop"
for i in $(seq 1 10); do
    X=$(docker ps | grep "1.7.2\|redi" | grep -v kafka| grep -v  ffspostgres ) 
    if [ " $X" == " " ]; then
        break
        echo "All services stopped break"
    fi
    echo "Waiting for services to stop sleep duration 3"
    sleep 3
done
echo "All services stopped"
echo "Starting all services"
for i in "${services[@]}"; do 
    echo "Starting $i"
    docker start $i &
done
echo "Waiting for all services to start"
for i in $(seq 1 10); do
    X=$(docker ps | grep "1.7.2\|redi" | grep -v kafka| grep -v  ffspostgres | grep Up | awk '{print $NF}' | wc -l| tr -d '[:blank:]') 
    if [ " $X" == " 15" ]; then
        break
        echo "All services started break"
    fi
    echo "Waiting for services to start sleep duration 3"
    sleep 3
done
sleep 30
cd /Users/arielnoy/test/opentelemetry-demo/test/playwright
npx playwright test test1.spec.ts
sleep 40
cd /Users/arielnoy/test/opentelemetry-demo/test/analyze
npm run start
echo Calling parse
npm run parse ./backup/$(ls -tr backup | grep json| tail -1)
cd /Users/arielnoy/test/opentelemetry-demo/test/analyze/backup
rm -f data.csv
let j=0; for i in *.csv ; do let j=$j+1; echo $i $j ; export j ; cat $i | perl -nape '/^startTime/ && (($ENV{"j"}==1) && (print ("test_num,")) || ($_="")) || print ($ENV{"j"},",")' >> data.csv ; done

scp -i ~/.ssh/Ariel_PlayGround.pem data.csv ec2-user@3.141.74.185:/opt/sisense/storage/data/
