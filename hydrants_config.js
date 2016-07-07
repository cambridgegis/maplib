maplib = window.maplib || {};
var constructionDateFormat = 'M d, yy';

maplib.config = {
	forceShowLayerPicker: true,
	minZoomLevel: 13,
	border: '1px solid #aaa',
	height: 500,
	width: 700,
	enableGeolocation: false,
	geolocateOnLoad: false,
	legendUrl: 'http://gis.cambridgema.gov/cwd/images/Legend_Hydrants.jpg',
	baselayers: [
		{
			type: "ags_tiled",
			title: "Basemap",
			attribution: "<a href='http://www.cambridgema.gov/gis' target='_blank'>Cambridge GIS</a>, PeopleGIS, Esri, DeLorme, NAVTEQ",
			serviceurl: "http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base",
			maxZoom: 16
		}
	],
	overlays: [
		{
			type: "ags_dynamic",
			title: "Hydrants",
			serviceurl: "http://gis.cambridgema.gov/arcgis/rest/services/CWDEmbeddedLayers",
			opacity: 1,
			attribution: "<a href='http://www.cambridgema.gov/gis' target='_blank'>Cambridge GIS</a>, PeopleGIS, Esri, DeLorme, NAVTEQ",
			layers: "show:0",
			startsVisible: true,
			format: "png8",
			notInLayerPicker: true,
			cluster: {
				queryLayer:"0",
				markerIcon: "",
				markerShadow : ""
			}
		},
		{
			type: "ags_tiled",
			title: "Cambridge Community Basemap",
			attribution: "<a href='http://www.cambridgema.gov/gis' target='_blank'>Cambridge GIS</a>, PeopleGIS, Esri, DeLorme, NAVTEQ",
			serviceurl: "http://gis.cambridgema.gov/ArcGIS/rest/services/CDDBasemap",
			startsVisible: true,
			notInLayerPicker: true,
			minZoom: 13
		},
		{
			type: "ags_dynamic",
			title: "Address Points",
			serviceurl: "http://gis.cambridgema.gov/ArcGIS/rest/services/GISEmbeddedLayers",
			opacity: 1,
			attribution: "<a href='http://www.cambridgema.gov/gis' target='_blank'>Cambridge GIS</a>, PeopleGIS, Esri, DeLorme, NAVTEQ",
			layers: "show:0",
			format: "png8",
			startsVisible: false,
			notInLayerPicker: true,
			queryOutFields: "Full_Addr",
			queryRelationship: null,
			queryRelationshipOutFields: null,
			queryTemplate: "<b>${attributes.Full_Addr}</b>",
			queryTemplateDebug: true,
			queryLayer: "0",
			queryClickTolerance: 10,
			queryMaxZoom: 14
		}

	],
	search : {
		position : {
			my: 'right-30px top+5px'
		},
		smartSearch: true,
		queryURL : "http://gis.cambridgema.gov/arcgis/rest/services/GISEmbeddedLayers/MapServer/4/query",
		searchField : "Search",
		style : {
			width : 200
		},
		placeholder : "Enter an Address"
	}
};
