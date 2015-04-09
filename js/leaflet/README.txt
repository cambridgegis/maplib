1/28/2015

leaflet-custom.js is based on leaflet 0.7.2, plus one custom patch
to build leaflet-custom.js from source (for instance, if you need to change leaflet.js in some way or debug it) use the following steps:

1. clone Leaflet repo
$ git clone https://github.com/Leaflet/Leaflet

2. checkout 0.7.2 tag from Leaflet repo
	$ cd Leaflet
then
	$git checkout "v0.7.2"

3. apply maplib custom patch
	$ git apply ../path/to/maplib/js/leaflet/Control.Layer.js.patch

	Note: On Windows you may need to add "--ignore-space-change --ignore-whitespace" depending on your core.autocrlf setting.

4. build leaflet distro from git repo
	$ npm install jshint uglify-js
	$ jake build[1vvvvvvv,custom]

5. dist/leaflet.js is now leaflet-custom.js


As of 1/28/2015, ignore any contents of the maplib/leaflet/src directory.  These files are not used
