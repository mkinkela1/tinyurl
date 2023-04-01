#!/bin/sh
yarn build
>&2 echo "Starting server..."
yarn start:dev