function Graph(options) {
	options = options || {};
	let canvasId = options.canvasId;
	let width = options.width || 300;
	let height = options.height || 200;
	let WINDOW = options.WINDOW || {};
	let callbacks = options.callbacks;

	let canvas;
	if (canvasId) {
		canvas = document.getElementById(canvasId);
	} else {
		canvas = document.createElement('canvas');
		document.querySelector('body').appendChild(canvas);
	}
	canvas.width = width;
	canvas.height = height;

	canvas.addEventListener('wheel', callbacks.wheel);
	canvas.addEventListener('mouseup', callbacks.mouseup);
	canvas.addEventListener('mousedown', callbacks.mousedown);
	canvas.addEventListener('mousemove', callbacks.mousemove);
	canvas.addEventListener('mouseleave', callbacks.mouseleave);

	let ctx = canvas.getContext('2d');

	this.xs = function (x) {
		return ((x - WINDOW.LEFT) / WINDOW.WIDTH) * canvas.width;
	};

	this.ys = function (y) {
		return canvas.height - ((y - WINDOW.BOTTOM) / WINDOW.HEIGHT) * canvas.height;
	};

	this.clear = function () {
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	};

	this.line = function (x1, y1, x2, y2, color = 'red', width = 2) {
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineWidth = width;
		ctx.moveTo(this.xs(x1), this.ys(y1));
		ctx.lineTo(this.xs(x2), this.ys(y2));
		ctx.stroke();
	};

	this.point = function (x, y, color = 'black', radius = 2) {
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.arc(this.xs(x), this.ys(y), radius, 0, 2 * Math.PI);
		ctx.stroke();
	};

	this.polygon = function (points, color = '#ff800055') {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(this.xs(points[0].x), this.ys(points[0].y));
		for (let i = 1; i < points.length; i++) {
			ctx.lineTo(this.xs(points[i].x), this.ys(points[i].y));
		}
		ctx.lineTo(this.xs(points[0].x), this.ys(points[0].y));
		ctx.closePath();
		ctx.fill();
	};

	this.text = function (x, y, text, color = 'black', fontSize = 8) {
		ctx.font = fontSize + 'px Arial';
		ctx.textBaseline = 'middle';
		ctx.textAlign = 'center';
		ctx.fillStyle = color;
		ctx.fillText(text, this.xs(x), this.ys(y));
	};

	this.sx = function (x) {
		return (x * WINDOW.WIDTH) / width;
	};

	this.sy = function (y) {
		return (-y * WINDOW.HEIGHT) / height;
	};
}
