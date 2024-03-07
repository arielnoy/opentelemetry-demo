#!/bin/sh

echo "Restarting all services"
#kill $(ps -e f| grep "kubectl port-forward" | grep -v grep | awk '{print $1}')
kubectl -n otel-demo rollout restart deployment opentelemetry-demo-accountingservice opentelemetry-demo-adservice opentelemetry-demo-cartservice opentelemetry-demo-checkoutservice \
    opentelemetry-demo-currencyservice opentelemetry-demo-emailservice opentelemetry-demo-featureflagservice opentelemetry-demo-frauddetectionservice \
    opentelemetry-demo-frontend opentelemetry-demo-frontendproxy opentelemetry-demo-otelcol opentelemetry-demo-paymentservice \
    opentelemetry-demo-productcatalogservice opentelemetry-demo-quoteservice opentelemetry-demo-recommendationservice opentelemetry-demo-redis \
    opentelemetry-demo-shippingservice opentelemetry-demo-jaeger

echo "Waiting for all services to stop"
for i in $(seq 1 20); do
    X=$(kubectl -n otel-demo get pods  | grep -v Running | grep -v "opentelemetry-demo-grafana-test" | awk '{print $1}' | grep -v NAME | wc -l| tr -d '[:blank:]') 
    if [ " $X" -eq " 0" ]; then
        break
        echo "All services finish stop"
    fi
    echo "Waiting for services to restart sleep duration 3 $i"
    sleep 3
done
echo "All services finish restart"
"#nohup kubectl port-forward --address=0.0.0.0 -n otel-demo svc/opentelemetry-demo-frontendproxy 8080:8080 >/tmp/tunnel.log 2>&1 </dev/null &
