#!/bin/bash

# Copy build configuration to openlayers build folder
cp lib/openlayers-build.cfg bower_components/openlayers/build/openlayers-build.cfg

# go to openlayers build folder
cd bower_components/openlayers/build

# run the build script
./build.py openlayers-build OpenLayers-build.js

# move the lib
mv OpenLayers-build.js ../../../lib/OpenLayers-build.js

# go back
cd ../../../
