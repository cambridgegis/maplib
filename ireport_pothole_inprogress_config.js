maplib = window.maplib || {};
var dateFormat = 'M d, yy';

maplib.config = {
	//	forceShowLayerPicker: true,
	minZoomLevel: 13,
	border: '1px solid #aaa',
	height: 500,
	width: 700,
	enableGeolocation: false,
	geolocateOnLoad: false,
	baselayers: [
		{
			type: "ags_tiled",
			title: "Basemap",
			serviceurl: "http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base",
			maxZoom: 16
		}
	],
	overlays: [
        {
        	layerType: "point",
			style: {
				opacity: 0.8,
				riseOnHover: true,
				icon: {
					iconUrl: 'http://www.mapsonline.net/peopleforms/htdocs/images/flag_big.png',
					iconSize: [38, 38],
					iconAnchor: [10, 30],
					popupAnchor: [-2, -2]
				}
			},
            type: "geojson",
            title: "Pothole Requests",
            attribution: "<a href='http://www.cambridgema.gov/gis' target='_blank'>Cambridge GIS</a>, PeopleGIS, Esri, DeLorme, NAVTEQ",
			url: "http://www.cambridgema.gov/ireport/webservices/ticketservice/pothole?state=inprogress&format=geojson",
            startsVisible: true,
            notInLayerPicker: false,
			queryTemplate: "<p><b>${properties.num}</b><br/>" +
			               "Opened: <b>${$.datepicker.formatDate(dateFormat, new Date(properties.opened.substr(0, 4), properties.opened.substr(5, 2) - 1, properties.opened.substr(8, 2)))}</b><br />" +
			               "Type: <b>${properties.type}</b><br />" +
			               "Address: <b>${properties.address}</b><br />" +
			               "State: <b>${properties.state}</b></p>"
        },
		{
			type: "ags_tiled",
			title: "Cambridge Community Basemap",
			attribution: "Cambridge GIS",
			serviceurl: "http://gis.cambridgema.gov/ArcGIS/rest/services/CDDBasemap",
			startsVisible: true,
			notInLayerPicker: true,
			minZoom: 13
		}
	]
};
