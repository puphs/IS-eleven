function Graph(options) {
    options = options || {};
    let canvasId = options.canvasId;
    let width = options.width || 300;
    let height = options.height || 200;
    let WINDOW = options.WINDOW || {};

    let canvas;
    if (canvasId) {
        canvas = document.getElementById(canvasId);
    } else {
        canvas = document.createElement('canvas');
        document.querySelector('body').appendChild(canvas);
    }
    canvas.width = width;
    canvas.height = height;

    let ctx = canvas.getContext('2d');

    function xs(x) {
        return x - WINDOW.LEFT;
        //return (x - WINDOW.LEFT) / WINDOW.width * canvas.width; 
    }

    function ys(y) {
        return y - WINDOW.BOTTOM;
        //return canvas.height - (y - WINDOW.BOTTOM) / WINDOW.height * canvas.height; 
    }


    this.clear = function() {
        ctx.fillStyle = '#dddddd';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    this.line = function(x1, y1, x2, y2, color = 'red', width = 2) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.width = width;
        ctx.moveTo(xs(x1), ys(y1));
        ctx.lineTo(xs(x2), ys(y2));
        ctx.stroke();
    }

}