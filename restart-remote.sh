#docker compose stop load-generator
cd /Users/arielnoy/test/opentelemetry-demo

scp -i ~/.ssh/Ariel_PlayGround.pem restart-services-kube.sh ec2-user@3.141.74.185:
ssh -i ~/.ssh/Ariel_PlayGround.pem ec2-user@3.141.74.185 "chmod +x restart-services-kube.sh; ./restart-services-kube.sh"
echo "Sleep 30"
sleep 20
cd /Users/arielnoy/test/opentelemetry-demo/test/playwright

tar cf - . | ssh -i ~/.ssh/Ariel_PlayGround.pem ubuntu@51.16.7.133 "rm -rf test/genci ; mkdir -p  test/genci ; cd test/genci; rm tests/._test* ; rm ._* ; tar xf -"

npx playwright test test2.spec.ts
sleep 40
cd /Users/arielnoy/test/opentelemetry-demo/test/analyze
npm run remote
echo Calling parse
npm run parse ./backup/$(ls -tr backup | grep json| tail -1)
cd /Users/arielnoy/test/opentelemetry-demo/test/analyze/backup
rm -f data.csv
let j=0; for i in *.csv ; do let j=$j+1; echo $i $j ; export j ; cat $i | perl -nape '/^startTime/ && (($ENV{"j"}==1) && (print ("test_num,")) || ($_="")) || print ($ENV{"j"},",")' >> data.csv ; done

scp -i ~/.ssh/Ariel_PlayGround.pem data.csv ec2-user@3.141.74.185:/opt/sisense/storage/data/
