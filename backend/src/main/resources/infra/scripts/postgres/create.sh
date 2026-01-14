#!/bin/bash
set -ex

DBNAME=$1
USERNAME=$2
PASSWORD=$3
PORT=$4
VERSION=$5

if [ -z "$DBNAME" ] || [ -z "$USERNAME" ] || [ -z "$PASSWORD" ] || [ -z "$PORT" ] || [ -z "$VERSION" ]; then
  echo "Usage: $0 <dbname> <username> <password> <port> <postgres_version>"
  exit 1
fi

if [ "$PORT" -lt 5400 ] || [ "$PORT" -gt 6000 ]; then
  echo "Error: Port must be between 5400 and 6000"
  exit 1
fi

CONTAINER_NAME="postgres-${USERNAME}-${DBNAME}"
VOLUME_NAME="pgdata-${USERNAME}-${DBNAME}"

docker run -d \
  --name "$CONTAINER_NAME" \
  -p "$PORT:5432" \
  -v "$VOLUME_NAME:/var/lib/postgresql/data" \
  --memory=512m \
  --cpus=0.5 \
  -e POSTGRES_USER="$USERNAME" \
  -e POSTGRES_PASSWORD="$PASSWORD" \
  -e POSTGRES_DB="$DBNAME" \
  postgres:"$VERSION"
