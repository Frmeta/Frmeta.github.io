class CenterGrid{
    constructor(canvas, grid_size){
        // Setup properties
        this.canvas = canvas;
        this.context = canvas.getContext('2d')
        this.grid_size = grid_size;
        
        // Setup first_x & first_y (to make sure (0,0) is at the middle of the screen)
        this.first_x = canvas.width/2
        while (this.first_x-grid_size > 0) this.first_x -= grid_size
        this.first_y = canvas.height/2
        while (this.first_y-grid_size > 0) this.first_y -= grid_size

        // Draw Grid
        this.drawGrid()
    }

    clear(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
    }


    drawGrid(){
        const THIN_LINE_WIDTH = 0.5;
        const BOLD_LINE_WIDTH = 1.5;
        this.context.strokeStyle = "#949494";

        // Draw Plus
        this.context.beginPath();
        this.context.lineWidth = BOLD_LINE_WIDTH;

        this.context.moveTo(0, canvas.height/2);
        this.context.lineTo(canvas.width, canvas.height/2);
        this.context.moveTo(canvas.width/2, 0);
        this.context.lineTo(canvas.width/2, canvas.height)

        this.context.stroke()


        // Draw the rest of the grid
        this.context.beginPath();
        this.context.lineWidth = THIN_LINE_WIDTH;

        // Draw Vertical Lines
        for (var x = this.first_x; x <= this.canvas.width; x += GRID_SIZE) {
            this.context.moveTo(x, 0);
            this.context.lineTo(x, canvas.height);
        }
    
        // Draw Horizontal Lines
        for (var y = this.first_y; y <= this.canvas.height; y += GRID_SIZE) {
            this.context.moveTo(0, y);
            this.context.lineTo(canvas.width, y);
        }
        context.stroke()
    }

    drawArrow(fromx, fromy, tox, toy){
        // draw line
        this.drawLine(fromx, fromy, tox, toy);
        
        // convert to canvas coordinate
        let from = this.gridToCanvas(fromx, fromy);
        let to = this.gridToCanvas(tox, toy);
        fromx = from.x;
        fromy = from.y;
        tox = to.x;
        toy = to.y;

        // Setup
        this.context.beginPath();
        this.context.lineWidth = 3;

        // Draw arrowhead
        var endRadians = Math.atan((toy - fromy) / (tox - fromx));
            endRadians += ((tox - fromx > 0) ? 90 : -90) * Math.PI / 180;
            this.drawArrowHead(tox, toy, endRadians);
        

    }
    drawLine(fromx, fromy, tox, toy){
        // convert to canvas coordinate
        let from = this.gridToCanvas(fromx, fromy);
        let to = this.gridToCanvas(tox, toy);
        fromx = from.x;
        fromy = from.y;
        tox = to.x;
        toy = to.y;

        // Setup
        this.context.beginPath();

        // Draw line
        this.context.moveTo(fromx, fromy);
        this.context.lineTo(tox, toy);
        this.context.stroke();
    }

    drawArrowHead(x, y, radians) {
        const SCALE = 1

        this.context.fillStyle = context.strokeStyle;
    
        this.context.save();
        this.context.beginPath();
        this.context.translate(x, y);
        this.context.rotate(radians);
        this.context.moveTo(0, 0);
        this.context.lineTo(5*SCALE, 10*SCALE);
        this.context.lineTo(-5*SCALE, 10*SCALE);
        this.context.closePath();
        this.context.restore();
        this.context.fill();
    }

    drawArc(x, y, radius, startAngle, endAngle, fill){
        // use gridtocanvas
        let pos = this.gridToCanvas(x, y);
        x = pos.x;
        y = pos.y;
        
        this.context.beginPath();
        this.context.arc(x, y, radius, startAngle, endAngle, false);
        this.context.stroke();
        this.context.lineTo(x, y);
        if (fill) this.context.fill();
    }

    canvasToGrid(x, y){
        return {
            x: (x - this.canvas.width/2) / this.grid_size,
            y: (y - this.canvas.height/2) / this.grid_size
        }
    }
    gridToCanvas(x, y){
        return {
            x: x * this.grid_size + this.canvas.width/2,
            y: y * this.grid_size + this.canvas.height/2
        }
    }

}





function matrixMultiply(a, b) {
    // a : m x n
    // b : n x p

    var m = a.length;
    var n = a[0].length;
    if ( n != b.length) return undefined;
    var p = b[0].length;

    result = new Array(m);  // initialize array of rows

    for (var r = 0; r < m; ++r) {
        result[r] = new Array(p); // initialize the current row
        for (var c = 0; c < p; ++c) {
            result[r][c] = 0;             // initialize the current cell
            for (var i = 0; i < n; ++i) {
                result[r][c] += a[r][i] * b[i][c];
            }
        }
    }
    return result;
}