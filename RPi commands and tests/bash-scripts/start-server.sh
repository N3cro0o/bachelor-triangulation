#! /usr/bin/bash

default() {
        echo "Please give mediamtx path"
}

start_server() {
        local path=$1
        cd ../../SPA/backend/rust/rpi-backend
        cargo r &
	cd "$path"
        ./mediamtx &
}

echo "Start backend server script"

if [ $# -eq 0 ]; then
        default
else
        if [ -d $1 ]; then
		start_server $1
        else
                echo "Please give DIRECTORY mediamtx path"
        fi
fi
