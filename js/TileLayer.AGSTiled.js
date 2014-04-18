L.TileLayer.AGSTiled = L.TileLayer.extend({
	getTileUrl: function(/*Point*/ tilePoint, /*Number*/ zoom)/*-> String*/ {
		var z = zoom - this.options.minZoom;
		var url = this._url.replace(/\{z\}/,z)
			.replace(/\{x\}/,tilePoint.x)
			.replace(/\{y\}/,tilePoint.y);
		return url;
	}
});
