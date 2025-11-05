# Bachelor's Project 2025

Repository used to contain bash scripts, simulation files and necessary backend and frontend applications used in Triangulation Bachelor's Project.
Each directory contains all files used in the development process.

## Used technologies

* **Simulation**
Godot 2D Physics Engine

* **Frontend**
React.js + javascript

* **Backend**
MediaMTX
Rust + tide

* **Other**
Nginx

## Usage

To start backend servers navigate to *RPi commands and tests/bash-scripts* and start *start-server.sh* script. As an argument pass absolute path pointing to the MediaMTX directory. To start frontend locally, navigate to *SPA/control-panel* directory and start node server. To host the web application using nginx use *copy-server.sh* script.