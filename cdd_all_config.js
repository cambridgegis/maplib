maplib = window.maplib || {};
maplib.config = {
	forceShowLayerPicker: true,
	minZoomLevel: 13,
	border: '1px solid #aaa',
	height: 500,
	width: 700,
	baselayers: [
		{
			type: "ags_tiled",
			title: "Basemap",
			serviceurl: "http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base",
			notInLayerPicker: true
			//errorTileUrl: "http://gis.cambridgema.gov/gis/lib/images/blank_tile_white.gif",
		}
	],
	overlays: [
		{
			type: "ags_dynamic",
			title: "Special Permits",
			serviceurl: "http://gis.cambridgema.gov/ArcGIS/rest/services/CDDEmbeddedLayers",
			opacity: 1,
			attribution: "City of Cambridge",
			layers: "show:40",
			startsVisible: true,
			queryOutFields: "*",
			queryRelationship: "0",
			queryRelationshipOutFields: "*",
			queryTemplate: "Permit Number: <b>${attributes.CaseID}</b><br />" +
                           "Address: <b>${attributes.ADDRESS}</b><br/>" +
                           "Status: <b>${attributes.Status}</b><br/>" + 
							"<div style='border: 1px solid #999; padding: 3px 3px 3px 10px; background-color: #eee'>Linked Documents:<br/>" + 
							"{{each relatedRecords}}<a target='_blank' href='http://gis.cambridgema.gov/CDD_Docs/${attributes.Document_Name}'>${attributes.Document_Type}</a><br/>{{/each}}</div>" +
                            "<a href=http://www.cambridgema.gov/CDD/#PB${attributes.CaseID} target='_blank'>More Information</a>",
			queryTemplateDebug: true,
			queryLayer: "41",
			queryClickTolerance: 10,
			queryMaxZoom: 13
		},
		{
			type: "ags_dynamic",
			title: "Trees",
			serviceurl: "http://gis.cambridgema.gov/ArcGIS/rest/services/DPWEmbeddedLayers/",
			opacity: 1,
			attribution: "City of Cambridge",
			layers: "show:0",
			queryAlways : true,
			startsVisible: true,
			queryOutFields: "*",
			queryTemplate: "Species: <b>${attributes.species}</b><br />" +
                           "Ownership: <b>${attributes.Ownership}</b><br/>",
			queryTemplateDebug: true,
			queryLayer: "0",
			queryClickTolerance: 10,
			queryMaxZoom: 13,
			paginateQueryResults: true
		},
		{
			type: "ags_dynamic",
			title: "Green Buildings",
			serviceurl: "http://gis.cambridgema.gov/ArcGIS/rest/services/CDDEmbeddedLayers",
			opacity: 1,
			attribution: "City of Cambridge",
			layers: "show:45",
			startsVisible: true,
			queryOutFields: "ProjectName,Address,LEEDSystemVersionName,CertLevel",
			queryTemplate: "Name: <b>${attributes.ProjectName}</b><br/>" +
                           "Address: <b>${attributes.Address}</b><br/>" + 
                           "Program: <b>${attributes.LEEDSystemVersionName}</b><br/>" + 
			               "Certification Level: <b>${attributes.CertLevel}</b>",
			queryTemplateDebug: true,
			queryLayer: "46",
			queryClickTolerance: 10,
			queryMaxZoom: 13
		},
		{
			type: "ags_dynamic",
			title: "Parks",
			serviceurl: "http://gis.cambridgema.gov/ArcGIS/rest/services/CDDEmbeddedLayers",
			opacity: 1,
			attribution: "City of Cambridge",
			layers: "show:50",
			startsVisible: true,
			queryOutFields: "*",
			queryTemplate: "Name: <b>${attributes['NAME']}</b><br/>" + 
			               "Type: <b>" +
			               "{{if attributes['FCODE'] == '1' }}" +
			                  "City park or playground" +
			               "{{else attributes['FCODE'] == '3' }}" +
			                  "Public school property" +
			               "{{else attributes['FCODE'] == '6' }}" +
			                  "Urban plaza" +
			               "{{else attributes['FCODE'] == '8' }}" +
			                  "Longfellow House" +
			               "{{else attributes['FCODE'] == '11' }}" +
			                  "Municipal golf course" +
			               "{{else attributes['FCODE'] == '21' }}" +
			                  "DCR-Owned park" +
			               "{{else attributes['FCODE'] == '41' }}" +
			                  "Privately owned, publicly accessible park" +
			               "{{else attributes['FCODE'] == '42' }}" +
			                  "Privately owned, publicly accessible plaza" +
			               "{{else attributes['FCODE'] == '43' }}" +
			                  "Public rooftop garden" +
			               "{{else}}" +
			                  "Other" +
			               "{{/if}}" +
			               "</b><br />" +
			               "Location: <b>${attributes['cambridge.gisdata.CDD_ParkDetails.Location']}</b><br/>" + 
			               "Neighborhood: <b>${attributes['cambridge.gisdata.CDD_ParkDetails.Neighborhood']}</b><br/>" + 
			               "<hr />",
			queryTemplateDebug: true,
			queryLayer: "51",
			queryClickTolerance: 10,
			queryMaxZoom: 13
		},
		{
			type: "ags_dynamic",
			title: "Current Projects",
			serviceurl: "http://gis.cambridgema.gov/ArcGIS/rest/services/CDDEmbeddedLayers",
			opacity: 1,
			attribution: "City of Cambridge",
			layers: "show:56",
			startsVisible: true,
			queryOutFields: "Project,ProjType,Webpage",
			queryTemplate: "Project: <b>${attributes.Project}</b><br/>" +
                           "Type: <b>${attributes.ProjType}</b><br/>" + 
			               "<a target='_blank' href=${attributes.Webpage}>More Information</a><hr />",
			queryTemplateDebug: true,
			queryLayer: "57",
			queryClickTolerance: 10,
			queryMaxZoom: 13
		},
		{
			type: "ags_dynamic",
			title: "Commercial Districts",
			serviceurl: "http://gis.cambridgema.gov/ArcGIS/rest/services/CDDEmbeddedLayers",
			opacity: 1,
			attribution: "City of Cambridge",
			layers: "show:71",
			startsVisible: true,
			queryOutFields: "*",
            queryTemplate: "Name: <b>${attributes.DistName}</b><br/>Type: <b>${attributes.DistType}</b><br/>" + 
                           "<b><a href='${attributes.Webpage}' target='_blank'>More Information</a></b><br/><hr/><br/>",
			queryTemplateDebug: true,
			queryLayer: "74",
			queryClickTolerance: 10,
			queryMaxZoom: 13
		},
		{
			type: "ags_dynamic",
			title: "Neighborhoods",
			serviceurl: "http://gis.cambridgema.gov/ArcGIS/rest/services/CDDEmbeddedLayers",
			opacity: 1,
			attribution: "City of Cambridge",
			layers: "show:88",
			startsVisible: true,
			queryOutFields: "*",
			queryTemplate: "Name: <b>${attributes.NAME}</b>",
			queryTemplateDebug: true,
			queryLayer: "88",
			queryClickTolerance: 10
		},
		{
			type: "ags_tiled",
			title: "Cambridge Community Basemap",
			serviceurl: "http://gis.cambridgema.gov/ArcGIS/rest/services/CDDBasemap",
			startsVisible: true,
			notInLayerPicker: true,
			minZoom: 13
		}
	]
	,search : {
		position : {
			my: 'right-50px top+10px',
			//at : 'right top', // optional, defaults to my
			//of : '.selector', // optional, defaults to #map
		},
		smartSearch: true,
		queryURL : "http://gis.cambridgema.gov/ArcGIS/rest/services/DPWEmbeddedLayers/MapServer/2/query",
		searchField : "Name",
		displayField : "Name",
		icon: {
			iconUrl: 'http://www.mapsonline.net/peopleforms/htdocs/images/flag_big.png',
			iconSize: [38, 38],
			iconAnchor: [10, 30],
			popupAnchor: [-2, -2]
		},		
		// this should be valid syntax for jQuery.css({}).  Properties will be passed over to the search box
		style : {
			width : 200
		}
	}

};
