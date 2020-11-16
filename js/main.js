window.onload = function () {
	let WINDOW = {
		LEFT: -15,
		BOTTOM: -15,
		WIDTH: 30,
		HEIGHT: 30,
	};

	const ZOOM_STEP = 0.5;
	const MAX_ZOOM = 3;
	const MIN_ZOOM = 0.25;
	let zoom = 1;

	let canScroll = false;

	let graph = new Graph({
		canvasId: "canvas",
		width: 600,
		height: 600,
		WINDOW: WINDOW,
		callbacks: {
			wheel,
			mouseup,
			mousedown,
			mousemove,
			mouseleave,
		},
	});

	let ui = new UI({
		callbacks: {
			addGraph,
		},
	});

	let graphs = [];

	function addGraph(graphData) {
		graphs.push(graphData);
		render();
	}

	function wheel(event) {
		let delta = event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
		//console.log(delta);
		if (WINDOW.WIDTH - ZOOM_STEP > 0 && WINDOW.HEIGHT - ZOOM_STEP > 0) {
			WINDOW.WIDTH += delta;
			WINDOW.HEIGHT += delta;
			WINDOW.LEFT -= delta * 0.5;
			WINDOW.BOTTOM -= delta * 0.5;
		}
		render();
	}
	function mouseup() {
		canScroll = false;
	}
	function mousedown() {
		canScroll = true;
	}
	function mousemove(event) {
		if (canScroll) {
			WINDOW.LEFT -= graph.sx(event.movementX);
			WINDOW.BOTTOM -= graph.sy(event.movementY);
			render();
		}
	}
	function mouseleave(event) {
		canScroll = false;
	}

	function drawFunction(f, color = "black", lineWidth = 2) {
		let x = WINDOW.LEFT;
		var dx = WINDOW.WIDTH / 1000;

		while (x < WINDOW.LEFT + WINDOW.WIDTH) {
			graph.line(x, f(x), x + dx, f(x + dx), color, lineWidth);
			x += dx;
		}
	}

	function drawOXY() {
		graph.line(WINDOW.LEFT, 0, WINDOW.WIDTH + WINDOW.LEFT, 0, "black");
		graph.line(0, WINDOW.BOTTOM, 0, WINDOW.BOTTOM + WINDOW.HEIGHT, "black");
	}

	function drawGrid(color = "#999999", lineSize = 1) {
		let left, bottom, width, height;
		left = Math.round(WINDOW.LEFT);
		bottom = Math.round(WINDOW.BOTTOM);
		width = Math.round(WINDOW.WIDTH);
		height = Math.round(WINDOW.HEIGHT);
		for (let x = left; x < left + width; x++) {
			graph.line(x, bottom, x, bottom + height, color, lineSize);
		}
		for (let y = bottom; y < bottom + height; y++) {
			graph.line(left, y, left + width, y, color, lineSize);
		}
	}

	function drawSegments(color = "black", unitSize = 0.2, fontSize = 8) {
		let left, bottom, width, height;
		left = Math.round(WINDOW.LEFT);
		bottom = Math.round(WINDOW.BOTTOM);
		width = Math.round(WINDOW.WIDTH);
		height = Math.round(WINDOW.HEIGHT);

		for (let x = left; x < left + width; x++) {
			if (x == 0) continue;
			graph.line(x, -unitSize / 2, x, unitSize / 2, color);
			graph.text(x, unitSize * 2, x, "black", fontSize);
		}
		for (let y = bottom; y < bottom + height; y++) {
			if (y == 0) continue;
			graph.line(-unitSize / 2, y, unitSize / 2, y, color);
			graph.text(unitSize * 2, y, y, "black", fontSize);
		}
		graph.text(unitSize * 2, -unitSize * 2, 0, "black", fontSize + "px");
	}

	function drawZero(f, xFrom, xTo, eps = 0.0001) {
		let dif = xFrom - xTo;
		let yFrom = f(xFrom);
		let yTo = f(xTo);
		let x = (xFrom + xTo) / 2;
		let y = f(x);

		//setInterval(function () {
		while (Math.abs(y) >= eps) {
			x = (xFrom + xTo) / 2;
			y = f(x);
			if (y * yFrom <= 0) {
				yFrom = y;
				xFrom = x;
			} else if (y * yTo <= 0) {
				yTo = y;
				xTo = x;
			} else {
				graph.point(x, 0, "red", 1);
				return;
			}
		}
		graph.point(x, 0, "red", 1);
	}

	function drawFunctionIntersection(f, g) {}

	function render() {
		graph.clear();
		drawGrid();
		drawOXY();
		drawSegments();
		//drawZero(f, 2, 4, 0.001);

		graphs.forEach((graph) => {
			drawFunction(graph.function, graph.color, graph.lineWidth);
		});
	}

	render();
};

function f(x) {
	//return Math.sin(x);//x * Math.sin(Math.abs(x));
	return Math.sin(x);
}

function g(x) {
	//return x * Math.cos(Math.abs(x));
	return x;
}
