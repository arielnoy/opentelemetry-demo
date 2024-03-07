#docker compose stop load-generator
cd /Users/arielnoy/test/opentelemetry-demo

echo "Restart Tunnel"
kill $(ps -ef  | grep ssh | grep 30846 | awk '{print $2}')
ssh -f -N -L 30846:172.31.8.65:30846 -i ~/.ssh/Ariel_PlayGround.pem -o ServerAliveInterval=60  ubuntu@51.16.7.133

scp -i ~/.ssh/Ariel_PlayGround.pem restart-services-kube.sh ubuntu@51.16.7.133:
ssh -i ~/.ssh/Ariel_PlayGround.pem ubuntu@51.16.7.133 "chmod +x restart-services-kube.sh; ./restart-services-kube.sh"
echo "Sleep 30"
sleep 20
cd /Users/arielnoy/test/opentelemetry-demo/test/playwright

tar cf - . | ssh  -i ~/.ssh/Ariel_PlayGround.pem ubuntu@51.16.7.133 "source ~/.nvm/nvm.sh;rm -rf test/genci ; mkdir -p  test/genci ; cd test/genci;  tar xf - 2>/dev/null ; rm tests/._test* ; rm ._* ; echo 'Start test' ; npx playwright test test3.spec.ts "

sleep 10
cd /Users/arielnoy/test/opentelemetry-demo/test/analyze
npm run remote-il
echo Calling parse
npm run parse ./backup/$(ls -tr backup | grep json| tail -1)
cd /Users/arielnoy/test/opentelemetry-demo/test/analyze/backup
rm -f data.csv
let j=0; for i in *.csv ; do let j=$j+1; echo $i $j ; export j ; cat $i | perl -nape '/^startTime/ && (($ENV{"j"}==1) && (print ("test_num,")) || ($_="")) || print ($ENV{"j"},",")' >> data.csv ; done

scp -i ~/.ssh/Ariel_PlayGround.pem data.csv ec2-user@3.141.74.185:/opt/sisense/storage/data/
