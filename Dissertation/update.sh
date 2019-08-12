#!/bin/bash

cd $(dirname $0)

unzip $1 -o

git add .

git commit -m "Overleaf auto update [$(date -Iminutes)]"