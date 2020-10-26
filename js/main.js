window.onload = function() {
    const WINDOW = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20,
    }
    
    let graph = new Graph({
        canvasId: 'canvas',
        width: 600,
        height: 600,
        WINDOW: WINDOW,
    });
    
    function drawFunction() {
        let x = WINDOW.LEFT;
        var dx = WINDOW.WIDTH / 1000;
    
        while (x <  WINDOW.LEFT + WINDOW.WIDTH) {
            graph.line(x, f(x), x + dx, f(x + dx), "red", 5);
            x += dx;
        }
    }

    function drawOXY() {
        graph.line(WINDOW.LEFT, 0, WINDOW.WIDTH + WINDOW.LEFT, 0, 'black')
        graph.line(0, WINDOW.BOTTOM, 0, WINDOW.BOTTOM + WINDOW.HEIGHT, 'black')
    }

    function drawGrid(color = "#999999", lineSize = 1) {
        for (let x = WINDOW.LEFT; x < WINDOW.WIDTH; x++) {
            graph.line(x, WINDOW.BOTTOM, x, WINDOW.BOTTOM + WINDOW.HEIGHT, color, lineSize);
        }
        for (let y = WINDOW.LEFT; y < WINDOW.WIDTH; y++) {
            graph.line(WINDOW.LEFT, y, WINDOW.LEFT + WINDOW.WIDTH, y, color, lineSize);
        }
    }

    function drawSegments(color = 'black', unitSize = 0.2, fontSize = 10) {
        for (let x = WINDOW.LEFT; x < WINDOW.WIDTH; x++) {
            if (x == 0)
                continue;
            graph.line(x, -unitSize / 2, x, unitSize / 2, color)
            graph.text(x, unitSize, x, 'black', fontSize);
        }
        for (let y = WINDOW.LEFT; y < WINDOW.WIDTH; y++) {
            if (y == 0)
                continue;
            graph.line(-unitSize / 2, y, unitSize / 2, y, color);
            graph.text(unitSize, y, y, 'black', fontSize);
        }
        graph.text(unitSize, -unitSize * 2, 0, 'black', fontSize + 'px');
    }
    
    function render() {
        graph.clear();
        drawGrid();
        drawOXY();
        drawSegments();
        drawFunction();
    }

    render();
}

function f(x) {
    return Math.cos(x);
}
