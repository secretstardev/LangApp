#!/usr/bin/env bash

# Add host.docker.internal to /etc/hosts if it doesn't exist

if [[ -n "${ADD_HOST_DOCKER_DOMAIN_TO_HOSTS-}" ]]; then
    HOST_DOMAIN="host.docker.internal"
    ping -q -c1 $HOST_DOMAIN > /dev/null 2>&1
    if [ $? -ne 0 ]; then
    HOST_IP=$(ip route | awk 'NR==1 {print $3}')
    echo -e "$HOST_IP\t$HOST_DOMAIN" >> /etc/hosts
    fi
fi

# Save environment variables to /etc/environment
env > /etc/environment

if [[ -n "${ENABLE_BEFORE_START_PROD-}" ]]; then
    bash /app/run/_web-before-start-prod.sh
fi