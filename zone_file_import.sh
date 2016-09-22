#!/usr/bin/env bash

if [ -z "$1" ]; then
  echo usage: $0 tsv-path
  exit
fi

file=$1;
filepath=$(realpath file);

psql \
  --username=importer \
  --dbname=breadth <<EOF
COPY domain_staging("domain") FROM '${filepath}' TEXT DELIMETER '\t';
EOF
