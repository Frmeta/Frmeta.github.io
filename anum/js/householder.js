const canvas = $("canvas")[0]
const context = canvas.getContext('2d');
const debug_text = $("#debug-text")[0];
const latex_text = $("h4")[0];


// Setup Canvas Size
canvas.width = 400
canvas.height = 400


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

// Setup Grid Size
const GRID_SIZE = 40;
centerGrid =  new CenterGrid(canvas, GRID_SIZE)


//
var x
var v

// mouse position
var x_position = 5
var y_position = 5
const radius = 10

var moving = false

// Householder
function householder(){

    centerGrid.clear()


    // Get Vector x
    grid_pos = centerGrid.canvasToGrid(x_position, y_position);
    x = [grid_pos.x, grid_pos.y]

    // Draw First Arrow (origin to x)
    context.lineWidth = 3;
    context.strokeStyle = '#9dff00';
    centerGrid.drawArrow(0, 0, x[0], x[1])

    // Compute Vector v 
    tambahan = ((x[0]>=0)*2-1) * Math.sqrt(x[0]**2 + x[1]**2)
    v = [x[0] + tambahan, x[1]]

    // Draw second arrow (x to v)
    context.strokeStyle = '#009999';
    centerGrid.drawArrow(x[0], x[1], v[0], v[1]);

    // Draw third arrow (origin to v)
    context.strokeStyle = '#009999';
    centerGrid.drawArrow(0, 0, v[0], v[1]);

    // Draw arrow unit vector of v
    var v_len = Math.sqrt(v[0]**2 + v[1]**2)
    v[0] /= v_len
    v[1] /= v_len
    centerGrid.drawArrow(0, 0, v[0], v[1]);
    
    // Compute and draw Vector r
    var dot = x[0]*v[0] + x[1]*v[1]
    r = [x[0] - 2*dot*v[0], x[1] - 2*dot*v[1]]
    context.strokeStyle = '#ff0000';
    centerGrid.drawArrow(0, 0, r[0], r[1])

    // Draw a plane
    let length = Math.sqrt(canvas.width**2, canvas.height**2)/GRID_SIZE;
    context.lineWidth = 1;
    context.strokeStyle = "#949494";
    centerGrid.drawLine(-v[1]*length, v[0]*length, v[1]*length, -v[0]*length);

    // refresh latex
    refresh_latex();

}



function refresh_latex(){
    H = [
        [1 - 2*v[0]*v[0] , -2*v[0]*v[1]],
        [-2*v[1]*v[0] , 1 - 2*v[1]*v[1]]
    ];

    detH = H[0][0] * H[1][1] - H[0][1] * H[1][0];

    Hx = [
        H[0][0]*x[0] + H[0][1]*x[1] ,
        H[1][0]*x[0] + H[1][1]*x[1]
    ];

    katex.render(String.raw`

        x =
        \begin{bmatrix}
        ${(x[0]).toFixed(2)} \\
        ${(x[1]).toFixed(2)}
        \end{bmatrix}\\

        H = 
        \begin{bmatrix}
        ${H[0][0].toFixed(2)} & ${H[0][1].toFixed(2)}\\
        ${H[1][0].toFixed(2)} & ${H[1][1].toFixed(2)}
        \end{bmatrix}\\

        det(H) = ${detH.toFixed(2)}\\
        Hx = 
        \begin{bmatrix}
        ${Hx[0].toFixed(2)} \\
        ${(Hx[1].toFixed(2)==0 ? 0 : Hx[1].toFixed(2)) }
        \end{bmatrix}\\

        `, latex_text, {
        throwOnError: false
    });
}

function down(e){
    moving = true
}

function move(e) {
    //if (!moving) return
    var rect = canvas.getBoundingClientRect();
    x_position = e.clientX - rect.left;
    y_position = e.clientY - rect.top;

    // clamp
    x_position = Math.max(x_position, 0)
    x_position = Math.min(x_position, canvas.width)
    y_position = Math.max(y_position,0)
    y_position = Math.min(y_position, canvas.height)


    householder()
}

function up(e){
    moving = false
}


window.onmousemove = move;
window.onmousedown = down;
window.onmouseup = up;




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