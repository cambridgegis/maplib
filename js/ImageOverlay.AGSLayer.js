L.ImageOverlay.AGSLayer = L.ImageOverlay.extend({
	initialize:function (/*String*/ url, /*Object*/ options) {
		this._url = url;
		this._createImageSwap();
		this.options = options;
	},
	onAdd: function (map) {

		this._map = map;

		this._bounds = this._map.getBounds();

		if (!this._image) {
			this._initImage();
		}

		map._panes.overlayPane.appendChild(this._image);

		//map.on('viewreset', this._reset, this);
		map.on('moveend', this._fetchAGSImage, this);
		this._fetchAGSImage();
		this._reset();
	},
	_fetchAGSImage : function() {
		var url = this._url;

		var bounds = this._map.getBounds();
		var nwPoint = bounds.getNorthWest(),
			sePoint = bounds.getSouthEast(),
			bbox = [nwPoint.lng, sePoint.lat, sePoint.lng, nwPoint.lat].join(',');

		var size = '&size=' + this._map.getSize().x + "," + this._map.getSize().y;
		var format = '&format=' + (this.options.format ? this.options.format : "png8");
		var transparent = '&transparent=true';
		var url = this._url + '/export?' + 'bbox=' + bbox + size + format + transparent + '&f=image';
		if (this.options.layers) {
			var layers = '&layers=' + this.options.layers;
			url += layers;
		}
		if(this.options.cacheBuster === true){
			url += '&rnd=' + Math.random()*10000000000000000;
		}
		if(this.options.bboxSR){
			//url += "&bboxSR=" + this.options.bboxSR;
		}
		url += "&bboxSR=4326";

		this.swapImage(url, bounds);
		
	},
	_onSwapImageLoad:function () {
		this._imageSwap.style.visibility = '';
		var overlayPane = this._map.getPanes().overlayPane;
		overlayPane.removeChild(this._image);
		overlayPane.appendChild(this._imageSwap);
		this._image = this._imageSwap;
		this._imageSwap = null;
		delete this._imageSwap;
		this._createImageSwap();
		this._bounds = this._futureBounds;
		this._reset();
	},
	_reset:function () {
		/** @type {L.LatLng} */
		var nwLatLng = this._bounds.getNorthWest();
		var seLatLng = this._bounds.getSouthEast();
		var topLeft = this._map.latLngToLayerPoint(nwLatLng);
		var bottomRight = this._map.latLngToLayerPoint(seLatLng);
		var size = bottomRight.subtract(topLeft);
		L.DomUtil.setPosition(this._image, topLeft);
		var currentWidth = $(this._image).width();
		var currentHeight = $(this._image).height();
		if (size.x != currentWidth) {
			this._image.style.width = size.x + 'px';
		}
		if (size.y != currentHeight) {
			this._image.style.height = size.y + 'px';
		}
	},
	swapImage:function (src, bounds) {
		this._imageSwap.style.visibility = 'hidden';
		this._imageSwap.src = src;
		this._image.src = '';
		this._futureBounds = bounds;
		//this._reset();
	},
	_createImageSwap:function () {
		this._imageSwap = L.DomUtil.create('img', 'leaflet-image-layer');

		this._imageSwap.style.visibility = 'hidden';

		L.Util.extend(this._imageSwap, {
			galleryimg:'no',
			onselectstart:L.Util.falseFn,
			onmousemove:L.Util.falseFn,
			onload:L.Util.bind(this._onSwapImageLoad, this)
		});
	}
});
