jQuery.extend({
   getScript: function(url, callback) {
	  var head = document.getElementsByTagName("head")[0];
	  var script = document.createElement("script");
	  script.src = url;

	  // Handle Script loading
	  {
		 var done = false;

		 // Attach handlers for all browsers
		 script.onload = script.onreadystatechange = function(){
			if ( !done && (!this.readyState ||
				  this.readyState == "loaded" || this.readyState == "complete") ) {
			   done = true;
			   if (callback)
				  callback();

			   // Handle memory leak in IE
			   script.onload = script.onreadystatechange = null;
			}
		 };
	  }

	  head.appendChild(script);

	  // We handle everything using the script element injection
	  return undefined;
   }
});

maplib = window.maplib || {};

maplib.version = "1.5.0";

// init the search icon
maplib.searchIcon = null;


maplib.generateSearchTree = function(aItems) {
	if (aItems.length == 2) {
		return [ [ aItems[0], aItems[1] ], [ aItems[1], aItems[0] ] ];
	}
	var searchTree = [];
	for (var i = 0; i < aItems.length; i++) {
		var item = aItems[i];
		var remaining = aItems.slice(0);
		remaining.splice(i,1);
		var subTree = maplib.generateSearchTree(remaining);
		for (var j = 0; j < subTree.length; j++) {
			searchTree.push( [item].concat(subTree[j]) );
		}
	}
	return searchTree;
};

maplib.permaLink = function() {
	var url = document.location.href.split("#")[0];
	var szPermalink = url + "#e=" + maplib.map.getCenter().lat + "," + maplib.map.getCenter().lng + "&z=" + maplib.map.getZoom();
	if (maplib.config.search &&	$('.search_container input').val()) {
		szPermalink += "&q=" + $('.search_container input').val();
	}

	$('#maplib-permalink-popup').html("Paste this link in an email to share this map<br/><input style='font-size: 12px; width:98%' type='text' value='" + szPermalink +"'></input>");
	$('#maplib-permalink-popup').dialog({draggable: false, title: "Permalink",width: '500px'});

};

(function() {
 
var nStartTime;
var nEndTime;
window.console = window.console || {"log": function() {}};

//var maplibPath = '__PUT_YOUR_MAPLIB_HTTP_PATH_PREFIX_HERE__';
var maplibPath = 'localhost/~sfarber/maplib/';

jQuery(document).ready(function() {

	var triggerLeaflet = function() {
		maplib.config.height && jQuery('#map').css('height',maplib.config.height);
		maplib.config.width && jQuery('#map').css('width',maplib.config.width);
		maplib.config.border && jQuery('#map').css('border',maplib.config.border);
		nStartTime = new Date();
		jQuery('#message').html("loading leaflet map");
		var aScripts = [
			'//' + maplibPath + '/js/leaflet/leaflet-custom.js',
			'//' + maplibPath + '/js/ImageOverlay.AGSLayer.js',
			'//' + maplibPath + '/js/TileLayer.AGSDynamic.js',
			'//' + maplibPath + '/js/TileLayer.AGSTiled.js',
			'//' + maplibPath + '/js/jquery.getCSS.min.js',
			'//ajax.microsoft.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js',
			//'//ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.js',
			'//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.js',
			"//cdnjs.cloudflare.com/ajax/libs/jquery.ba-bbq/1.2.1/jquery.ba-bbq.min.js",
			"//cdnjs.cloudflare.com/ajax/libs/jquery-placeholder/2.0.7/jquery.placeholder.min.js",
			'//maps.google.com/maps/api/js?key=AIzaSyBVhjB9GjNPsQG6KKQ6-bPpiFX4oKfcKMc&sensor=false&callback=maplib.finishScripts'
		];
		if (!$.browser) {
			aScripts.splice(0,0,"//" + maplibPath + "/js/jquery.browser.js");
		}
		aScripts = aScripts.reverse();
		loadScripts(aScripts);
	}

	triggerLeaflet();
});

var loadScripts = function(aScripts, callback) {
	if (aScripts.length == 0) {
		callback && callback();
		return;
	}
	var szScript = aScripts.pop();

	jQuery.getScript(szScript, function() {
//		console.log("fetching script " + szScript);
		loadScripts(aScripts, callback);
	});
};

maplib.finishScripts = function() {
	var loadCSS = function() {
		var css = '//' + maplibPath + '/css/leaflet.css';
		// ie seems to not time this right
		if (!jQuery.getCSS) {
			window.setTimeout(loadCSS, 200);
			return;
		}

		jQuery.getCSS('//ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/themes/base/minified/jquery-ui.min.css', function () {});
		jQuery.getCSS(css, function() {
//			if (jQuery.browser.msie && jQuery.browser.version < 9) {
//				jQuery.getCSS('http://' + maplibPath + '/css/leaflet/leaflet.ie.css', function() {
//					try {
//						setupMap();
//					} catch (e) {
//						console.log("error loading map: ",e);
//					}
//				});
//			} else {
				//console.log("finishing map setup");
				try {
					setupMap();
				} catch (e) {
					console.log("error loading map: ",e);
				}
//			}
		});
	};
	loadScripts(['//' + maplibPath + '/js/Google.js'], loadCSS);

	var setupMap = function() {

		// set position, zoom, and map extents
		var initLatLng = new L.LatLng(42.38, -71.11);
		var initZoomLevel = 13;
		if (maplib.config.initialMapExtents) {
			if (maplib.config.initialMapExtents.initialCenterPoint) {
				initLatLng = new L.LatLng(maplib.config.initialMapExtents.initialCenterPoint.lat, maplib.config.initialMapExtents.initialCenterPoint.lng);
			}
			if (maplib.config.initialMapExtents.initialZoomLevel) {
				initZoomLevel = maplib.config.initialMapExtents.initialZoomLevel;
			}
		}

		var permaExtent = $.bbq.getState("e");
		if (permaExtent) {
			var aBits = permaExtent.split(",");
			if (aBits.length == 2) {
				initLatLng = new L.LatLng(parseFloat(aBits[0]),parseFloat(aBits[1]));
			}
		}

		var permaZoom = $.bbq.getState("z");
		if (permaZoom) {
			initZoomLevel = parseInt(permaZoom);
		}

		var permaQuery = $.bbq.getState("q");
		if (permaQuery && maplib.config.search) {
			var searchField = maplib.config.search.searchField || 'search';
			var data = {
				"outFields" : "*",
				"outSR" : "4326",
				"f" : "pjson",
				"where" : searchField + " like '" + permaQuery + "'"
			};

			jQuery.ajax({
				"url": maplib.config.search.queryURL,
				"dataType":"jsonp",
				"data" : data,
				"success" :function (data) {
					maplib.search.drawSingleSearchResult(data.features[0]);
					$('.search_container input').val(permaQuery);
				}
			});
		}

		var map = new L.Map('map', {
			center: initLatLng,
			zoom: initZoomLevel,
			crs: L.CRS.EPSG3857,
			minZoom: maplib.config.minZoomLevel
		});
		maplib.map = map;

		var baselyrs = {};
		var baseCount = 0;
		var firstLayer;
		jQuery.each(maplib.config.baselayers, function(idx, baselayerConfig) {
			var layer = maplib.layer[baselayerConfig.type].createLeafletLayer(baselayerConfig);
			if (!firstLayer) firstLayer = layer;
			baselyrs[baselayerConfig.title] = layer;
			baseCount++;
		});
		map.addLayer(firstLayer);
		if (baseCount === 1) {
			baselyrs = {};
		}

		var overlays = [];
		var ovl = {};
		var bIdentifyEnabled = false;
		var queryCfgs = [];
		firstLayer = false;
		jQuery.each(maplib.config.overlays, function(idx, overlayConfig) {
			overlays.push(overlayConfig);
		});

		//GEOJSON attribution - Fix for issue #16
		var gjAttributionLayers = [];
		map.on('overlayadd', onOverlayAdd);
		map.on('overlayremove', onOverlayRemove);
		var onOverlayAdd = function(e){
			// loop though and process the attribution array
			for( var i=0; i<gjAttributionLayers.length; i++ ) {
				// get next gj layer
				var gj = gjAttributionLayers[i];
				if( gj.title === e.name ) {
					// re-add the layer
					gj.layer.addTo( map );
				}
			}
		}
		var onOverlayRemove = function(e){
			// loop though and process the attribution array
			for( var i=0; i<gjAttributionLayers.length; i++ ) {
				// get next gj layer
				var gj = gjAttributionLayers[i];
				if( gj.title === e.name ) {
					// remove the layer
					map.removeLayer( gj.layer );
				}
			}
		}

		overlays = overlays.reverse();
		deferredLayers = [];
		jQuery.each(overlays, function(idx, overlayConfig) {

			var layer = maplib.layer[overlayConfig.type].createLeafletLayer(overlayConfig);
			if (overlayConfig.startsVisible) {
				overlayConfig.type !== 'geojson' && map.addLayer(layer);
				overlayConfig.type == 'geojson' && layer.done(function(lyr) {
					maplib.geojsonlayer = lyr;
					map.addLayer(lyr);
					ovl[overlayConfig.title] = lyr;
					maplib.drawLayersControl();
				});
			}

			// GEOJSON attribution - Fix for issue #16
	 		if( overlayConfig.type === 'geojson' && overlayConfig.attribution ) {
				// create new geoJson object
				var gj = L.geoJson();
				// define the getAttribution function
				gj.getAttribution = function() { return overlayConfig.attribution; };
				// add it to the map
				gj.addTo(map);
				// record the layer name
				gjAttributionLayers.push( { title:overlayConfig.title,layer:gj } );
			}

			if (!overlayConfig.notInLayerPicker) {
				ovl[overlayConfig.title] = layer;
			}
			if (overlayConfig.queryTemplate) {
				if (overlayConfig.type !== 'geojson') {
					bIdentifyEnabled = true;
					overlayConfig._layer = layer;
					queryCfgs.push(overlayConfig);
				} else {
					layer.done(function(lyr) {
						$.each(lyr._layers, function(idx, sublayer) {
							overlayConfig.queryTemplateDebug && console.log(sublayer._feature);
							if (overlayConfig.queryTemplate[0] == '#') {
								var content = jQuery.tmpl($(overlayConfig.queryTemplate), sublayer.feature);
							} else {
								var content = jQuery.tmpl(overlayConfig.queryTemplate, sublayer.feature);
							}
							sublayer.bindPopup($("<span></span>").append(content).html());
						});
					});
				}
			}
		});

		tmp = [];
		jQuery.each(ovl, function(key, value) {
			tmp.push({title: key, layer: value});
		});
		tmp = tmp.reverse();

		jQuery.each(tmp, function(key, value) {
			ovl[value.title] = value.layer;
		});

		maplib.drawLayersControl = function() {
			if (baseCount > 1 || maplib.config.forceShowLayerPicker) {
				if (maplib.layersControl) {
					maplib.map.removeControl(maplib.layersControl);
				}
				var layersControl = new L.Control.Layers(baselyrs, ovl);
				map.addControl(layersControl);
				if (maplib.config.legendUrl) {
					layersControl.setLegendUrl(maplib.config.legendUrl);
				}
				maplib.layersControl = layersControl;
			}
		};
		maplib.drawLayersControl();

		$('body').on("click","div.query-results-paginator .query-results-paginator-controls input", function(evt) {
			var divPaginate = $(this).parents(".query-results-paginator");
			divPaginate = $(divPaginate);
			var active = parseInt(divPaginate.data("active-page"))
			if ($(this).val() == "<") {
				if (active === 0) {
					// can't go back before 0
					return;
				} else {
					$(divPaginate.children()[active]).hide();
					$(divPaginate.children()[active - 1]).show();
					divPaginate.data("active-page", active - 1);
					divPaginate.find(".result-count").html(active);
					$(this).next().prop("disabled", false);
					if (active - 1 === 0) {
						$(this).prop("disabled", true);
					}
				}
			} else {
				if (active === divPaginate.children().length - 2) {
					// can't go past the end
					return;
				} else {
					$(divPaginate.children()[active]).hide();
					$(divPaginate.children()[active + 1]).show();
					divPaginate.data("active-page", active + 1);
					divPaginate.find(".result-count").html(active + 2);
					$(this).prev().prop("disabled", false);
					if (active + 1 === divPaginate.children().length - 2) {
						$(this).prop("disabled", true);
					}
				}
			}
		});
		var renderPopup = function(overlayConfig, features, evt) {

			var width = 300;
			if (overlayConfig.queryPopupWidth) {
				width = parseInt(overlayConfig.queryPopupWidth);
			}

			var popupContent = '';
			if (overlayConfig._layer.metadata.geometryType == 'esriGeometryPoint') {
				var extent = maplib.getESRIFeatureExtent(features[0].geometry);			
				var markerLatlng = new L.LatLng(extent.center.y,extent.center.x);
			} else {
				var clickPoint = new L.Point(evt.layerPoint.x,evt.layerPoint.y);
				var markerLatlng = map.layerPointToLatLng(clickPoint);
			}
			var popup = new L.Popup( { maxWidth : width } );
			popup.setLatLng(markerLatlng);
			overlayConfig.queryTemplateDebug && console.log(features);
			var content;
			if (overlayConfig.paginateQueryResults && features.length > 1) {
				var divPaginate = $('<div class="query-results-paginator" data-active-page="0"></div>');
				var isFirst = true;
				$.each(features, function(idx, feature) {
					var divFeature = $('<div class="query-result-page"></div>');
					if (!isFirst) {
						divFeature.hide();
					} else {
						isFirst = false;
					}
					if (overlayConfig.queryTemplate[0] == '#') {
						var html = jQuery.tmpl($(overlayConfig.queryTemplate), feature);
					} else {
						var html = jQuery.tmpl(overlayConfig.queryTemplate, feature);
					}
					divFeature.html(html);
					divPaginate.append(divFeature);
				});
				divPaginate.append('<div class="query-results-paginator-controls"><input type="button" value="<" disabled="disabled"/><input type="button" value=">" />&nbsp;&nbsp;<span class="result-count">1</span> of ' + features.length + '</div>');
				content = divPaginate;
			} else {
				if (overlayConfig.queryTemplate[0] == '#') {
					content = jQuery.tmpl($(overlayConfig.queryTemplate), features);
				} else {
					content = jQuery.tmpl(overlayConfig.queryTemplate, features);
				}
			}

			popup.setContent("<div id='results' style='width: " + width + "px'></div>");
			map.openPopup(popup);
			$('#results').append(content);

			if (overlayConfig.queryTemplatePostRenderScript) {
				eval (overlayConfig.queryTemplatePostRenderScript);
			}
		};

		var handleIdentifyClick = function(evt) {
			var queries = [];
			jQuery.each(queryCfgs, function(idx, overlayConfig) {
				if (overlayConfig.queryMaxZoom && (map.getZoom() < overlayConfig.queryMaxZoom)) {
					// map zoom level is higher than the max zoom level that this layer allows
					 return;
				}

				// check whether the layer is actually in the map right now
				var enabled = false;
				jQuery.each(maplib.map._layers, function(idx, obj) {
					if (overlayConfig._layer._leaflet_id == obj._leaflet_id) {
						enabled = true;
						return false;
					}
				});
				if (overlayConfig.queryAlways) {
					enabled = true;
				}
				if (!enabled) {
					return;
				}

				var ll = new L.Point(
					evt.layerPoint.x - overlayConfig.queryClickTolerance,
					evt.layerPoint.y + overlayConfig.queryClickTolerance
				);
				var llGeom = map.layerPointToLatLng(ll);

				var ur = new L.Point(
					evt.layerPoint.x + overlayConfig.queryClickTolerance,
					evt.layerPoint.y - overlayConfig.queryClickTolerance
				);
				var urGeom = map.layerPointToLatLng(ur);
				var q = jQuery.ajax({
					"url" : overlayConfig.serviceurl + "/MapServer/" + overlayConfig.queryLayer + "/query",
					"type" : "GET",
					"dataType" : "jsonp",
					"data" : {
						"geometryType" : "esriGeometryEnvelope",
						"geometry" : llGeom.lng + "," + llGeom.lat + "," + urGeom.lng + "," + urGeom.lat,
						"inSR" : "4326",
						"outSR" : "4326",
						"f" : "json",
						"outFields" : overlayConfig.queryOutFields
					}
				});
				q.overlayConfig = overlayConfig;
				queries.push(q);
			});
			$.when.apply(this,queries).then(function () {
				var args = arguments;
				if (!(arguments[0] instanceof Array)) {
					args = [arguments];
				}
				var resultLayers = [];
				jQuery.each(args, function(idx, response) {
					if (response && response[0] && (!response[0].error) && response[0].features.length > 0) {
						resultLayers.push({
							cfg: response[2].overlayConfig,
							data: response[0]
						});
					}
				});

				if (resultLayers.length == 0) {
					return;
				}

				// if there was exactly one query, then we can show the "single layer popup" now
				if (resultLayers.length == 1) {
					maplib.showSingleLayerPopup(resultLayers[0].data, resultLayers[0].cfg, evt);
					return;
				}

				// if there were two or more queries, then we need to insert the "multi-layer popup" now
				var popupContent = '';
				var clickPoint = new L.Point(evt.layerPoint.x,evt.layerPoint.y);
				var markerLatlng = map.layerPointToLatLng(clickPoint);
				var popup = new L.Popup();
				popup.setLatLng(markerLatlng);

				maplib.multiresultTmpl = "<h3 class='multi_result_popup' style='background-color: #eee; margin: 4px; padding: 4px'>View results from ${cfg.title}</h3>";
				var content = jQuery.tmpl(maplib.multiresultTmpl , resultLayers);
				popup.setContent("<div id='multipleresults' style='width: 300px'></div>");
				map.openPopup(popup);
				$('#multipleresults').append(content);
				jQuery('.multi_result_popup').on('click',function() {
					map.closePopup();
					var tmplItem = jQuery(this).tmplItem();
					maplib.showSingleLayerPopup(tmplItem.data.data, tmplItem.data.cfg, evt);
				});
			});
		};

		maplib.showSingleLayerPopup = function(data, overlayConfig, evt) {
			if (data.features.length === 0) {
				//console.log("no features found");
				return;
			}

			// we handle point and line/polygon layers differently
			if (overlayConfig._layer.metadata.geometryType == 'esriGeometryPoint') {
				// first, collapse together all items at the same point
				var features = {};
				jQuery.each(data.features, function(idx, item) {
					var extent = maplib.getESRIFeatureExtent(item.geometry);
					var numDecimals = Math.pow(10,4);
					var lon = Math.round(extent.center.x*numDecimals)/numDecimals;
					var lat = Math.round(extent.center.y*numDecimals)/numDecimals;
					if (features[lon + "-" + lat]) {
						features[lon + "-" + lat].push(item);
					} else {
						features[lon + "-" + lat] = [item];
					}
				});

				var firstFeatures = false;
				jQuery.each(features, function(idx, item) { if (!firstFeatures) { firstFeatures = item; } return false});
			} else {
				var firstFeatures = data.features;
			}

			if (overlayConfig.queryRelationship) {
				var objectIds = [];
				jQuery.each(firstFeatures, function(idx, item) {
					objectIds.push(item.attributes.OBJECTID);
				});

				jQuery.ajax({
					"url" : overlayConfig.serviceurl + "/MapServer/" + overlayConfig.queryLayer + "/queryRelatedRecords",
					"type" : "GET",
					"dataType" : "jsonp",
					"data" : {
						"objectids" : objectIds.join(","),
						"relationshipid" : overlayConfig.queryRelationship,
						"outSR" : "4326",
						"f" : "json",
						"outFields" : overlayConfig.queryRelationshipOutFields
					},
					success: function(data, txtStatus, xhr) {
						jQuery.each(data.relatedRecordGroups, function(idx, recGroup) {
							var feature = jQuery.grep(firstFeatures, function(elt, idx) {
								if (elt.attributes.OBJECTID == recGroup.objectId) {
									return true;
								}
								return false;
							})[0];
							feature.relatedRecords = recGroup.relatedRecords;
						});
						renderPopup(overlayConfig, firstFeatures, evt);
					}
				});
			} else {
				renderPopup(overlayConfig, firstFeatures, evt);
			}
		};

		if (bIdentifyEnabled) {
			map.on('click',handleIdentifyClick);
		}
		
		// search logic goes here.
		if (maplib.config.search) {
			placeholder = (maplib.config.search.placeholder) ? maplib.config.search.placeholder : "Search";
			var searchContainerFragment = jQuery("<div class='search_container '><input placeholder='" + placeholder  + "' type='text' class='search_container_autocomplete' /></div>");
			var searchStyle = jQuery.extend({
				"box-shadow":"0 1px 7px #999999",
				"background-color": "#F8F8F9",
				"width" : 150,
				"font-size":"14px"
			}, (typeof maplib.config.search.style != "undefined" ? maplib.config.search.style : {}) );
			$('.search_container_autocomplete').placeholder();

 			// set up jQuery UI Position structure from config
 			var searchPositionConfig = maplib.config.search.position;
 			if (typeof searchPositionConfig =="undefined" ) {
 				searchPositionConfig = {};
 			}
			
 			if (typeof searchPositionConfig.of =="undefined" ) {
 				searchPositionConfig.of = "#map";
 			}

 			if (typeof searchPositionConfig.at == "undefined" && typeof searchPositionConfig.my != "undefined" ) {
 				searchPositionConfig.at = searchPositionConfig.my;
 			}	

			searchContainerFragment.find('.search_container_autocomplete')
				.css(searchStyle)
			.autocomplete(
				{
				"appendTo": "#map",
				"minLength" : 2,
				"open": function(event, ui) {

						$(this).autocomplete("widget").css(
							{
						"width": searchStyle.width,
						"max-height": "100px",
						"overflow-y" : "auto",
						"overflow-x" : "hidden",
						"padding-right" : "20px"
							}
						);
				},
				"source" : function (request,response) {

					var data = {
						"outFields" : "*",
						"f" : "pjson",
						"outSR" : "4326",
					};
					var searchField = maplib.config.search.searchField || 'search';
					if (maplib.config.search.smartSearch && request.term.indexOf(" ") !== -1) {
						var aTerms = request.term.split(" ");
						var aSearchTree = maplib.generateSearchTree(aTerms);
						var aQueries = [];
						for (var i = 0; i < aSearchTree.length; i++) {
							aQueries.push("( " + searchField + " like '%" + aSearchTree[i].join("%") + "%')");
						}
						data.where = aQueries.join(" OR ");
						//data.where = "search like '%"+request.term.split(" ").join("%")+"%'";
					} else {
						data.where = searchField + " like '%"+request.term+"%'";
					}
					
					$.ajax({
						"url": maplib.config.search.queryURL,
						"dataType":"jsonp",
						"data" : data,
						"success" :function (respData, status, xhr) {
							if (respData.error) {
								console.log("error with query:", maplib.config.search.queryURL, data)
								return;
							}
							var displayField = maplib.config.search.displayField || 'Display';
							response ( $.map (respData.features, function (item) {
								return {
									label: item.attributes[displayField],
									value: item.attributes[searchField],
									data: item
								};
							}));
						}
							}
						);
					},
					select : function (event, ui) {
						//console.log(ui, ui.item, event, this);
						var data = ui.item.data;
						// here we want to query the referenced layer given UniqueID and a Target Layer
						// and then render a popup according to...??? if referenced layer exists as an overlay, then we can target that.
						maplib.search.drawSingleSearchResult(data);
					}
				}
			)
			.data( "ui-autocomplete" )._renderItem = function( ul, item ) {
				return $( "<li></li>" )
					.css({"font-size":"12px"})
					.data( "ui-autocomplete-item", item )
					.append( "<a>"+ item.label + "</a>" ) //  + + "<br>" + item.desc + "</a>"
					.appendTo( ul );
			};

			jQuery(".leaflet-control-container").eq(0).append(searchContainerFragment);

			// attach the change event handler to the search box
			searchContainerFragment.keyup( 
				function(){ 
					
					// check for empty and clear any search pins
					if( $( 'input', searchContainerFragment ).val() === '' ){
						maplib.clearSearchIcon();
					}

				}
			);

			// size the search box
			searchContainerFragment.css(
				{
					"z-index":"6",
					"width": searchStyle.width
 				}
 			);

			// position the search box
			searchContainerFragment.position( searchPositionConfig );	
			L.DomEvent.disableClickPropagation(jQuery(".search_container_autocomplete")[0]);

			maplib.search = {};
			maplib.search.searchContainer = searchContainerFragment;			
			maplib.search.drawSingleSearchResult = function(feature) {
				var detailSearchTriggered = false;
				$.each(maplib.config.overlays, function(idx, item) {
					if (item.title == feature.attributes.TargetLayer) {
						detailSearchTriggered = true;
						var overlayConfig = item;
						var q = jQuery.ajax({
							"url" : overlayConfig.serviceurl + "/MapServer/" + overlayConfig.queryLayer + "/query",
							"type" : "GET",
							"dataType" : "jsonp",
							"data" : {
								"where" : "OBJECTID=" + feature.attributes.UniqueID,
								"outSR" : "4326",
								"f" : "json",
								"outFields" : overlayConfig.queryOutFields
							}
						}).success(function(resp) {
							if (resp.features.length == 0) {
								alert("no result found with OBJECTID " + feature.attributes.UniqueID + " in layer " + overlayConfig.title);
								return;
							}

							var extent = maplib.getESRIFeatureExtent(resp.features[0].geometry);
							var centerLatLong = new L.LatLng(extent.center.y, extent.center.x);
							maplib.map.panTo( centerLatLong );
							maplib.map.setZoom(maplib.config.search.searchZoom || 18);

							// clear any previous search marker
							maplib.clearSearchIcon();

							// add point
							if( maplib.config.search && maplib.config.search.icon ) {
								maplib.searchIcon = L.marker( centerLatLong, {icon:L.icon( maplib.config.search.icon )} ).addTo( maplib.map );
							}

							// add popup as necessry
							if (overlayConfig.queryTemplate) {
								maplib.showSingleLayerPopup(resp, overlayConfig, null);
							}
						});
					}
				});
				if (!detailSearchTriggered && feature.geometry) {
					var extent = maplib.getESRIFeatureExtent(feature.geometry);
					var centerLatLong = new L.LatLng(extent.center.y, extent.center.x);
					maplib.map.panTo( centerLatLong );
					maplib.map.setZoom(maplib.config.search.searchZoom || 18);

					// clear any previous search marker
					maplib.clearSearchIcon();

					// add point
					if( maplib.config.search && maplib.config.search.icon ) {
						maplib.searchIcon = L.marker( centerLatLong, {icon:L.icon( maplib.config.search.icon )} ).addTo( maplib.map );
					}
				}
			};
			
		}

		$('body').append($('<div id="maplib-permalink-popup"></div>'));
		maplib.map.attributionControl && maplib.map.attributionControl.setPrefix("<a href='#' onclick='maplib.permaLink()'>Permalink</a>");
		nEndTime = new Date();
		//console.log("leaflet map loaded in " + (nEndTime.getTime() - nStartTime.getTime()) + "ms");
	};

	L.TileLayer.AGSTiled = L.TileLayer.extend({
		getTileUrl: function(/*Point*/ tilePoint)/*-> String*/ {
			var url = this._url.replace(/\{z\}/,tilePoint.z)
				.replace(/\{x\}/,tilePoint.x)
				.replace(/\{y\}/,tilePoint.y);
			return url;
		}
	});

};
})();

maplib.clearSearchIcon = function(){
	// clear any previous search marker
	if( maplib.searchIcon ) {
		maplib.map.removeLayer( maplib.searchIcon );
	}
};

maplib.layer = {
	googlestreets: {
		createLeafletLayer: function(config) {
			var layer = new L.Google('ROADMAP');
			return layer;
		}
	},
	googlehybrid: {
		createLeafletLayer: function(config) {
			var layer = new L.Google('HYBRID');
			return layer;
		}
	},
	ags_tiled: {
		createLeafletLayer: function(config) {
			var layerUrl = config.serviceurl + '/MapServer/tile/{z}/{y}/{x}';
			return new L.TileLayer.AGSTiled(
				layerUrl,
				{
					minZoom : config.minZoom || 0,
					maxZoom: config.maxZoom || 19,
					errorTileUrl: config.errorTileUrl ? config.errorTileUrl : ''
				}
			);
		}
	},
	ags_dynamic: {
		createLeafletLayer: function(config) {
			
			var layer = new L.TileLayer.AGSDynamic(
				config.serviceurl + "/MapServer",
				{
					maxZoom: config.maxZoom || 19,
					attribution: config.attribution,
					opacity: config.opacity,
					layers: config.layers,
					format: config.format,
					cacheBuster: true,
					bboxSR: '102113'
				}
			);
			if (config.queryLayer) {
				jQuery.ajax({
					"url" : config.serviceurl + "/MapServer/" + config.queryLayer + "?f=json",
					"type" : "GET",
					"dataType" : "jsonp",
					"success" : function(data) {
						layer.metadata = data;
					}
				});
			}
			return layer;
		}
	},
	ags_dynamic_singleimage : {
		createLeafletLayer: function(config) {
			var layer = new L.ImageOverlay.AGSLayer(
				config.serviceurl + "/MapServer",
				{
					maxZoom: config.maxZoom || 19,
					attribution: config.attribution,
					opacity: config.opacity,
					layers: config.layers,
					format: config.format,
					cacheBuster: true,
					bboxSR: '102113'
				}
			);
			if (config.queryLayer) {
				jQuery.ajax({
					"url" : config.serviceurl + "/MapServer/" + config.queryLayer + "?f=json",
					"type" : "GET",
					"dataType" : "jsonp",
					"success" : function(data) {
						layer.metadata = data;
					}
				});
			}
			return layer;
		}
	},
	openstreetmap: {
		createLeafletLayer: function(config) {
			// openstreetmaps
			var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
			return osm;
		}
	},
	geojson: {
		createLeafletLayer: function(config) {
			var layerLoadDeferred = $.Deferred();

			// check for style options
			var styleOptions = {};
			if( config.style ) {

				// process icon if found
				var icon = {};
				if( config.style.icon ){

					// create the icon object
					var newIcon =  L.icon( config.style.icon );

					// process into object to pass to the layer
					icon = { icon: newIcon };
				}

				// merge all
				jQuery.extend( styleOptions, config.style, icon );
			}

			// determine if point layer
			var symbologyOptions = {};
			if( config.layerType && config.layerType === 'point' ) {

				// add marker callback
				symbologyOptions.pointToLayer = function ( feature, latlng ) {
					return L.marker( latlng, styleOptions );
				}.bind(this);
			} else {

				// style is symbology
				symbologyOptions = styleOptions;

			}

			// set default GeoJSON options
			var defaultOptions = {
				maxZoom: config.maxZoom || 19,
				attribution: config.attribution,
				opacity: config.opacity
			}

			// merge default options with custom symbology
			var gjOptions = {};
			jQuery.extend( gjOptions, defaultOptions, symbologyOptions )

			// create layer
			$.ajax(config.url).done(
				function( data, textStatus, jqXHR ) {
					if (typeof(data) == 'string') {
						data = JSON.parse(data);
					}
					var gjson = new L.GeoJSON(data,
						gjOptions
					);
					layerLoadDeferred.resolveWith(this,[gjson]);
				}
			);
			return layerLoadDeferred;
		}
	}
};

maplib.getESRIFeatureExtent = function(geom) {
	// see http://help.arcgis.com/en/arcgisserver/10.0/apis/rest/geometry.html
	var extent = {
		minx: 9007199254740992,
		miny: 9007199254740992,
		maxx: -9007199254740991,
		maxy: -9007199254740991
	};

	if (geom.rings || geom.paths) {
		//it's a polygon or a path.  Check the segments
		var prop = '';
		if (geom.rings) {
			prop = 'rings';
		} else if (geom.paths) {
			prop = 'paths';
		}
		for (var i = 0; i < geom[prop].length; i++) {
			for (var j = 0; j < geom[prop][i].length; j++) {
				var pt = geom[prop][i][j];
				if (pt[0] < extent.minx) extent.minx = pt[0];
				if (pt[0] > extent.maxx) extent.maxx = pt[0];
				if (pt[1] < extent.miny) extent.miny = pt[1];
				if (pt[1] > extent.maxy) extent.maxy = pt[1];
			}
		}
	} else if (geom.x && geom.y) {
		// it's a point
		extent.minx = extent.maxx = geom.x;
		extent.miny = extent.maxy = geom.y;
	} else if (geom.points) {
		// it's a multi-point
		for (var i = 0; i < geom.rings.length; i++) {
			var pt = geom.points[i];
			if (pt[0] < extent.minx) extent.minx = pt[0];
			if (pt[0] > extent.maxx) extent.maxx = pt[0];
			if (pt[1] < extent.miny) extent.miny = pt[1];
			if (pt[1] > extent.maxy) extent.maxy = pt[1];
		}
	} else {
		console.log("unknown geometry",geom);
		alert("It's not your fault!  An unknown geometry type was returned from ArcGIS Server and this website can't figure out where to put the marker on the map.  Please contact the site maintainer so that he or she can fix this problem.");
		return false;
	}

	extent.center = {};
	extent.center.x = extent.minx + ((extent.maxx - extent.minx) / 2);
	extent.center.y = extent.miny + ((extent.maxy - extent.miny) / 2);

	return extent;
};
