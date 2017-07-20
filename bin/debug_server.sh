#!/bin/bash

currentDir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
projectDir=$currentDir/../

eval $($currentDir/setenv.sh)

cd $projectDir

npm install

nodemon server.js
