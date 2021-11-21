#!/bin/bash
set -ex
docker image rm -f local:debug  
docker build -t local:debug .
docker run --rm -p 80:80 -it local:debug
