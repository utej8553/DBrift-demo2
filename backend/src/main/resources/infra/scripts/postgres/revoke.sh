#!/bin/bash
set -e

CONTAINER_NAME=$1
VOLUME_NAME=$2

if [ -z "$CONTAINER_NAME" ] || [ -z "$VOLUME_NAME" ]; then
  echo "Usage: $0 <container_name> <volume_name>"
  exit 1
fi

echo "Stopping container..."
docker stop "$CONTAINER_NAME" || true

echo "Removing container..."
docker rm "$CONTAINER_NAME" || true

echo "Removing volume..."
docker volume rm "$VOLUME_NAME" || true

echo "Database revoked and destroyed successfully."
