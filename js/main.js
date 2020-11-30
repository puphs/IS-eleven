window.onload = function () {
	let WINDOW = {
		LEFT: -15,
		BOTTOM: -15,
		WIDTH: 30,
		HEIGHT: 30,
	};

	const ZOOM_STEP = 0.5;
	// const MAX_ZOOM = 3;
	// const MIN_ZOOM = 0.25;
	let zoom = 1;

	let canScroll = false;

	let graph = new Graph({
		canvasId: 'canvas',
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
			setFunction,
			setDerivative,
			setIntegral,
		},
	});

	let functions = [];

	function setFunction(graphData, functionIndex) {
		functions[functionIndex] = graphData;
		render();
	}

	function setDerivative(value, functionIndex) {
		//console.log(functions[functionIndex]);
		if (functions[functionIndex]) {
			functions[functionIndex].derivative = value;
			render();
		}
	}

	function setIntegral(value, functionIndex) {
		if (functions[functionIndex]) {
			functions[functionIndex].integral = value;
			render();
		}
	}

	function wheel(event) {
		let delta = event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
		//console.log(delta);
		//if (WINDOW.WIDTH - ZOOM_STEP > 0 && WINDOW.HEIGHT - ZOOM_STEP > 0) {
		WINDOW.WIDTH += delta;
		WINDOW.HEIGHT += delta;
		WINDOW.LEFT -= delta * 0.5;
		WINDOW.BOTTOM -= delta * 0.5;
		//}
		render();
	}
	function mouseup() {
		canScroll = false;
	}
	function mousedown() {
		canScroll = true;
	}

	let mouseX;
	function mousemove(event) {
		if (canScroll) {
			WINDOW.LEFT -= graph.sx(event.movementX);
			WINDOW.BOTTOM -= graph.sy(event.movementY);
		}
		mouseX = graph.sx(event.offsetX) + WINDOW.LEFT;
		render();
	}
	function mouseleave(event) {
		canScroll = false;
	}

	function drawFunction(f, color = 'black', lineWidth = 2) {
		let x = WINDOW.LEFT;
		var dx = WINDOW.WIDTH / 1000;

		while (x < WINDOW.LEFT + WINDOW.WIDTH) {
			graph.line(x, f(x), x + dx, f(x + dx), color, lineWidth);
			x += dx;
		}
	}

	function drawOXY() {
		graph.line(WINDOW.LEFT, 0, WINDOW.WIDTH + WINDOW.LEFT, 0, 'black');
		graph.line(0, WINDOW.BOTTOM, 0, WINDOW.BOTTOM + WINDOW.HEIGHT, 'black');
	}

	function drawGrid(color = '#999999', lineSize = 1) {
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

	function drawSegments(color = 'black', unitSize = 0.2, fontSize = 8) {
		let left, bottom, width, height;
		left = Math.round(WINDOW.LEFT);
		bottom = Math.round(WINDOW.BOTTOM);
		width = Math.round(WINDOW.WIDTH);
		height = Math.round(WINDOW.HEIGHT);

		for (let x = left; x < left + width; x++) {
			if (x == 0) continue;
			graph.line(x, -unitSize / 2, x, unitSize / 2, color);
			graph.text(x, unitSize * 2, x, 'black', fontSize);
		}
		for (let y = bottom; y < bottom + height; y++) {
			if (y == 0) continue;
			graph.line(-unitSize / 2, y, unitSize / 2, y, color);
			graph.text(unitSize * 2, y, y, 'black', fontSize);
		}
		graph.text(unitSize * 2, -unitSize * 2, 0, 'black', fontSize + 'px');
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
				graph.point(x, 0, 'red', 1);
				return;
			}
		}
		graph.point(x, 0, 'red', 1);
	}

	//function drawFunctionIntersection(f, g) {}

	function getDerivative(f, x0) {
		let deltaX = 0.01;
		return (f(x0 + deltaX) - f(x0)) / deltaX;
	}

	function drawDerivative(f, x0) {
		const der = getDerivative(f, x0);
		if (der) {
			const x1 = WINDOW.LEFT - x0;
			const x2 = WINDOW.LEFT + WINDOW.WIDTH - x0;
			graph.line(x1 + x0, der * x1 + f(x0), x2 + x0, der * x2 + f(x0), 'red', 2);
			graph.point(x0, f(x0), 'red', 3);
		}
	}

	function getIntegral(f, a, b) {
		const dx = (b - a) / 1000;
		let x = a;
		let s = 0;
		while (x <= b) {
			s += (Math.abs(f(x)) + Math.abs(f(x + dx))) * dx * 0.5;
			x += dx;
		}
		return s;
	}

	function drawIntegral(f) {
		let { a, b } = ui.getAB();
		if (typeof a == 'number' && typeof b == 'number' && !isNaN(a) && !isNaN(b) && a !== b) {
			if (a > b) [a, b] = [b, a];
			const dx = (b - a) / 1000;
			let x = a;
			let points = [];
			points.push({ x: x, y: 0 });
			while (x <= b) {
				points.push({ x: x, y: f(x) });
				x += dx;
			}
			points.push({ x: b, y: 0 });
			graph.polygon(points);

			// print integral
			let s = getIntegral(f, a, b);
		}
	}

	function render() {
		graph.clear();
		drawGrid();
		drawOXY();
		drawSegments();
		//drawZero(f, 2, 4, 0.001);

		functions.forEach((func) => {
			drawFunction(func.f, func.color, func.lineWidth);
			if (func.derivative) drawDerivative(func.f, mouseX);
			//if (func.integral)
			if (func.integral) drawIntegral(func.f);
		});
	}

	render();
};

// (f(x(i)) + f(x(i + 1))) / 2 * dx
// 1. В разметку страницы добавить 2 инпута с идентификаторами a и b
// 2. Для каждой функции добавить чекбокс интеграл. При изменении чекбокса должен вызываться колбэк setIntegral
// 3.
