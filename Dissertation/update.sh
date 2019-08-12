#!/bin/bash

cd $(dirname $0)

unzip -o $1

git add .

git commit -m "Overleaf auto update [$(date -Iminutes)]"

