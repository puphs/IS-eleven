window.onload = function() {
    const WINDOW = {
        LEFT: -150,
        BOTTOM: -150,
        WIDTH: 150,
        HEIGHT: 150,
    }
    
    let graph = new Graph({
        canvasId: 'canvas',
        width: 600,
        height: 600,
        WINDOW: WINDOW,
    });
    
    function drawFunction() {
        let x = WINDOW.LEFT;
        var dx = WINDOW.WIDTH / 100;
    
        while (x <  WINDOW.LEFT + WINDOW.WIDTH) {
            graph.line(x, f(x), x + dx, f(x + dx));
            console.log(x);
            x += dx;
        }
    }
    
    function render() {
        graph.clear();
        drawFunction();
    }

    render();
}

function f(x) {
    return Math.cos(x);
}
