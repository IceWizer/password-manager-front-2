#!/usr/bin/env bash

if [ "$1" != "" ]; then
	exec "$@"
	exit 0
fi

npm i
npm run dev