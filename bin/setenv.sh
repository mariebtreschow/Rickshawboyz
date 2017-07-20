#!/bin/bash
currentDir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
projectDir=$currentDir/../
settingsDir=$projectDir/..

# Check if property file exist in root of project
if [ ! -f "$settingsDir/build.properties" ]; then
    echo "Build.properties not present. Exiting"
    exit 1
fi

# Set the system variables
if [ "$(uname)" == "Darwin" ] || [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    # Read the property file and convert to variables
    while read -r; do
        [[ $REPLY = *=* ]] || continue
        setting=${REPLY%%=*}
        value=${REPLY#*=}
        echo export "$setting"="$value"
    done < $settingsDir/build.properties

elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ] || [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then

    # Read the property file and convert to variables
    while read -r; do
        [[ $REPLY = *=* ]] || continue
        setting=${REPLY%%=*}
        value=${REPLY#*=}
        echo setx $setting $value
    done < $settingsDir/build.properties

else
    echo "Unsupported platform, can not build the project. Please do the steps manually"
    exit 1
fi
