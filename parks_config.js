maplib = window.maplib || {};
maplib.config = {
	minZoomLevel: 13,
	border: '1px solid #aaa',
	height: 500,
	width: 700,
	baselayers: [
		{
			type: "ags_tiled",
			title: "Basemap",
			serviceurl: "http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base",
			attribution: "<a href='http://www.cambridgema.gov/gis' target='_blank'>Cambridge GIS</a>, PeopleGIS, Esri, DeLorme, NAVTEQ",
			maxZoom: 16
		}
	],
	overlays: [
		{
			type: "ags_dynamic_singleimage",
			title: "Parks",
			serviceurl: "http://gis.cambridgema.gov/ArcGIS/rest/services/CDDEmbeddedLayers",
			opacity: 1,
			attribution: "<a href='http://www.cambridgema.gov/gis' target='_blank'>Cambridge GIS</a>, PeopleGIS, Esri, DeLorme, NAVTEQ",
			layers: "show:15",
			startsVisible: true,
			notInLayerPicker: true,
			format: "png8",
			queryOutFields: "*",
			queryTemplate: "<div id='tabs' style='height: 160px'>" + // style='height: 200px; width: 400px'>" +
				 		   "<ul>" +
				 			"<li><a href='#tab-1'>Park Info</a></li>" +
				 			"<li><a href='#tab-2'>Uses</a></li>" +
				 			"<li><a href='#tab-3'>Contact</a></li>" +
				 			"<li><a href='#tab-4'>More Info</a></li>" +
				 		   "</ul>" +
						   "<div id='tab-1'>" +
							 "<table style='border-style:none'><tr><td style='border-style:none'>" + 
							 "{{if attributes['JOIN_ID'] == 154 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/" + "cambridgecommon_154" + "_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 49 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/" + "reverendwilliams_049" + "_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 266 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/ahern_266_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 377 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/alberico_377_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 133 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/alden_133_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 80 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/bergin_080_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 154 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/cambridgecommon_154_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 250 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/centanniway_250_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 289 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/charlespark_289_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 308 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/clementmorgan_308_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 281 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/costalopeztaylor_281_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 366 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/dana_366_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 388 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/davidnunes_388_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 230 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/donnelly_230_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 244 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/elmhampshire_244_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 165 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/flagstaff_165_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 283 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/franklin_283_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 304 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/frontpark_304_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 394 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/fulmore_394_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 209 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/gannettwarrenpals_209_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 200 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/goldstarmotherspark_200_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 278 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/hurley_278_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 145 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/larchroad_145_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 253 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/lechmerecanal_253_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 370 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/lopezstreet_370_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 176 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/lowellschool_176_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 202 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/mapleave_202_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 287 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/marketstreet_287_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 419 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/newriverside_419_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 238 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/paine_238_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 324 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/pinestreet_324_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 115 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/raymond_115_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 49 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/reverendwilliams_49_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 346 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/riversidepress_346_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 130 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/sacramento_130_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 272 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/sennott_272_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 242 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/silva_242_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 301 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/sixthstwalkway_301_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 286 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/squirrel_286_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{else attributes['JOIN_ID'] == 251 }}" +
							   "<img src='http://gis.cambridgema.gov/Parks/wilderlee_251_1.jpg' style='height:75px; width:100px;' alt='' vspace='5' hspace='5'/></td>" + 
							 "{{/if}}" +
							 "<td style='border-style:none'>" +
			/*
							 "{{if attributes['InformationWeb'] != null }}" +
								"<a href=http://${attributes['InformationWeb']} target='_blank'>" +
							 "{{/if}}" +
			*/
							 "<b>${attributes['NAME']}</b><br />" +
			/*
							 "{{if attributes['InformationWeb'] != null }}" +
								"</a>" +
							 "{{/if}}" +
			*/
							 "<b>" +
							 "{{if attributes['FCODE'] == '1' }}" +
								"City Park" +
							 "{{else attributes['FCODE'] == '3' }}" +
								"Public School Grounds" +
							 "{{else attributes['FCODE'] == '6' }}" +
								"Public Plaza" +
							 "{{else attributes['FCODE'] == '8' }}" +
								"National Park Service" +
							 "{{else attributes['FCODE'] == '11' }}" +
								"Municipal Golf Course" +
							 "{{else attributes['FCODE'] == '21' }}" +
								"DCR Park" +
							 "{{else attributes['FCODE'] == '41' }}" +
								"Privately Owned, Publicly Accessible Park" +
							 "{{else attributes['FCODE'] == '42' }}" +
								"Privately Owned, Publicly Accessible Plaza" +
							 "{{else attributes['FCODE'] == '43' }}" +
								"Rooftop Garden" +
							 "{{else}}" +
								"Other" +
							 "{{/if}}" +
							 "</b><br />" +
							 "{{if attributes['Location'] != null }}" +
								"<b>${attributes['Location']}</b><br />" + 
							 "{{/if}}" +
							 "{{if attributes['Hours'] != null }}" +
								"Hours: <b>${attributes['Hours']}</b><br />" + 
							 "{{/if}}" +
							 "</td></tr></table>" +
						   "</div>" +
						   "<div id='tab-2'>" + 
							"{{if attributes['KidPlay'] != null && attributes['Athletics'] == null}}" +
							   "Activities: <b>${attributes['KidPlay']}</b><br />" + 
							"{{else attributes['KidPlay'] != null && attributes['Athletics'] != null}}" +
							   "Activities: <b>${attributes['KidPlay']}, ${attributes['Athletics']}</b><br />" + 
							"{{else attributes['Athletics'] != null }}" + 
							   "Activities: <b>${attributes['Athletics']}</b><br />" + 
							"{{/if}}" +
							"{{if attributes['CommunityGardenPlots'] == 'Yes' }}" +
								"Community Garden Plots: <b>Yes</b><br />" + 
							"{{/if}}" +
							"{{if attributes['OffLeashDogUse'] != null}}" +
							 "Off Leash Dog Use: <b>${attributes['OffLeashDogUse']}</b><br />" + 
							"{{/if}}" +
						   "</div>" +
						   "<div id='tab-3'>" +
							 "Managed By: <b>${attributes['ManagedBy']}</b><br />" +
							 "Information: " + 
							 "{{if  attributes['InformationWeb'] != null}}" +
							   "<a href='http://" + "${attributes['InformationWeb']}" + "' target='_blank'><b>${attributes['Information']}</a></b><br />" +
							 "{{else}}" +
							   "<b>${attributes['Information']}</b><br />" +
							 "{{/if}}" +
							 "Event Permits: <b>${attributes['EventPermits']}</b><br />" +
							 "Field Permits: " + 
							 "{{if  attributes['FieldPermitsWeb'] != null}}" +
							   "<a href='http://" + "${attributes['FieldPermitsWeb']}" + "' target='_blank'><b>${attributes['FieldPermits']}</a></b><br />" +
							 "{{else}}" +
							   "<b>${attributes['FieldPermits']}</b><br />" +
							 "{{/if}}" +
							 "{{if attributes['CommunityGardenPlots'] == 'Yes' }}" +
							  "Community Gardens: " + 
							  "{{if  attributes['CommunityGardensWeb'] != null}}" +
								"<a href='http://" + "${attributes['CommunityGardensWeb']}" + "' target='_blank'><b>${attributes['CommunityGardensPhone']}</a></b><br />" +
							  "{{else}}" +
								"<b>${attributes['CommunityGardensPhone']}</b><br />" +
							  "{{/if}}" +
							 "{{/if}}" +
							 "{{if  attributes['OffLeashUsePhone'] != null}}" +
							  "Off Leash Dog Use: " + 
							  "{{if  attributes['OffLeashUseWeb'] != null}}" +
								"<a href='http://" + "${attributes['OffLeashUseWeb']}" + "' target='_blank'><b>${attributes['OffLeashUsePhone']}</a></b><br />" +
							  "{{else}}" +
								"<b>${attributes['OffLeashUsePhone']}</b><br />" +
							  "{{/if}}" +
							 "{{/if}}" +
						   "</div>" +
						   "<div id='tab-4'>" + 
							 "{{if attributes['Acres'] == 1}}" +
							   "Area: <b>${attributes['Acres']} acre</b><br />" +
							 "{{else}}" +
							   "Area: <b>${attributes['Acres']} acres</b><br />" +
							 "{{/if}}" +
							 "Established: <b>${attributes['Established']}</b><br />" +
							 "Renovated: <b>${attributes['LastRenovation']}</b><br />" +
						   "</div>" +
						   "</div>",
			queryTemplatePostRenderScript: "$j('#tabs').tabs();" +
										   "$j('.ui-tabs-panel').css('font-size','12px');" +
										   "$j('.ui-tabs-panel').css('overflow-y','auto');" +
										   "$j('.ui-tabs-panel').css('max-height','100px');" +
										   "$j('.leaflet-popup-content').css('margin','7px 16px');" +
										   "$j('.ui-tabs-nav').css('font-size','12px');",
			queryTemplateDebug: true,
			queryLayer: "21",
			queryClickTolerance: 1,
			queryMaxZoom: 13,
			queryPopupWidth: 350
		},
		{
			type: "ags_dynamic_singleimage",
			title: "Community Gardens",
			serviceurl: "http://gis.cambridgema.gov/ArcGIS/rest/services/CDDEmbeddedLayers",
			opacity: 1,
			attribution: "<a href='http://www.cambridgema.gov/gis' target='_blank'>Cambridge GIS</a>, PeopleGIS, Esri, DeLorme, NAVTEQ",
			layers: "show:18",
			startsVisible: true,
			notInLayerPicker: true,
			format: "png8",
			queryOutFields: "PARK,LOCATION",
			queryTemplate: "<p><b>Community Garden</b><br/>" +
					 "Name: <b>${attributes.PARK}</b><br/>" +
					 "Location: <b>${attributes.LOCATION}</b></p>",
			queryTemplateDebug: true,
			queryLayer: "18",
			queryClickTolerance: 10,
			queryMaxZoom: 13,
			queryPopupWidth: 300
		},
		{
			type: "ags_tiled",
			title: "Cambridge Community Basemap",
			attribution: "<a href='http://www.cambridgema.gov/gis' target='_blank'>Cambridge GIS</a>, PeopleGIS, Esri, DeLorme, NAVTEQ",
			serviceurl: "http://gis.cambridgema.gov/ArcGIS/rest/services/CDDBasemap",
			startsVisible: true,
			notInLayerPicker: true,
			minZoom: 13
		}
		// ,{
		// 	type: "ags_dynamic",
		// 	title: "Address Points",
		// 	serviceurl: "http://gis.cambridgema.gov/ArcGIS/rest/services/GISEmbeddedLayers",
		// 	opacity: 1,
		// 	attribution: "<a href='http://www.cambridgema.gov/gis' target='_blank'>Cambridge GIS</a>, PeopleGIS, Esri, DeLorme, NAVTEQ",
		// 	layers: "show:0",
		// 	format: "png8",
		// 	startsVisible: false,
		// 	notInLayerPicker: true,
		// 	queryOutFields: "Full_Addr",
		// 	queryRelationship: null,
		// 	queryRelationshipOutFields: null,
		// 	//queryTemplate: "<b>${attributes.Full_Addr}</b>",
		// 	//queryTemplateDebug: true,
		// 	queryLayer: "0",
		// 	queryClickTolerance: 10,
		// 	queryMaxZoom: 14
		// }
	],
	search : {
		position : {
			my: 'right-10px top+10px'
		},
		smartSearch: true,
		queryURL : "http://gis.cambridgema.gov/arcgis/rest/services/GISEmbeddedLayers/MapServer/0/query",
		searchField : "Full_Addr",
		style : {
			width : 200
		},
		placeholder : "Enter an Address",
		searchZoom : 17,
		icon: {
			iconUrl: 'http://www.mapsonline.net/peopleforms/htdocs/images/flag_big.png',
			iconSize: [38, 38],
			iconAnchor: [10, 30],
			popupAnchor: [-2, -2]
		}
	}

};
