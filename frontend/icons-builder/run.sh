#!/bin/bash

if ! command -v svgo &> /dev/null
then
    echo "The svgo command was not found. Installation..."
    npm install -g svgo
else
    echo "Svgo command found. Launch..."
    svgo --config=svgo.config.js icons/*.svg
    node build.js
fi
