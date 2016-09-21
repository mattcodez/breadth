#!/usr/bin/env bash

file=$1;
filepath=$(realpath file);

psql \
  --username=importer
  --dbname=breadth <<EOF
COPY domain_staging("domain") FROM '${filepath}' TEXT DELIMETER '\t';
EOF
