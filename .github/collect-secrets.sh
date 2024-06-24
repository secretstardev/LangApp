#!/bin/bash
# You can use this script to collect secrets from your local system.
echo "BACKEND_CONFIG_INDEX=$(cat ./backend/web/index-local.php | base64 | tr -d '\n\r')"
echo "BACKEND_CONFIG_PARAMS=$(cat ./backend/config/params-local.php | base64 | tr -d '\n\r')"
echo "BACKEND_CONFIG_WEB=$(cat ./backend/config/web-local.php | base64 | tr -d '\n\r')"
echo "DOCKER_CONFIG=$(cat ./k8s/docker-config.json | base64 | tr -d '\n\r')"
echo "ENV_CONFIG=$(cat ./.env | base64 | tr -d '\n\r')"