const canvas = $("canvas")[0]
const context = canvas.getContext('2d');
const debug_text = $("h3")[0]

$(document).ready(refresh_latex);

function refresh_latex(){
    var element = $("h4")[0];
    katex.render(String.raw`
        x = \begin{bmatrix}
        ${((x_position-canvas.width/2)/GRID_SIZE).toFixed(2)} \\
        ${((y_position-canvas.height/2)/GRID_SIZE).toFixed(2)}
        \end{bmatrix}
        `, element, {
        throwOnError: false
    });
}

// Setup Canvas size
canvas.width = 500
canvas.height = 500

const GRID_SIZE = 40;

// Create Grid
function drawBoard(){
    const THIN_LINE_WIDTH = 0.5;
    const BOLD_LINE_WIDTH = 1.5;
    
    var first_x = canvas.width/2
    while (first_x-GRID_SIZE > 0){
        first_x -= GRID_SIZE
    }

    var first_y = canvas.height/2
    while (first_y-GRID_SIZE > 0){
        first_y -= GRID_SIZE
    }
    
    context.strokeStyle = "#949494";
    for (var x = first_x; x <= canvas.width; x += GRID_SIZE) {
        context.beginPath();
        if (x == canvas.width/2) {
            context.lineWidth = BOLD_LINE_WIDTH;
        } else{
            context.lineWidth = THIN_LINE_WIDTH;
        }

        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke()
    }

    for (var y = first_y; y <= canvas.height; y += GRID_SIZE) {
        context.beginPath();
        if (y == canvas.height/2) {
            context.lineWidth = BOLD_LINE_WIDTH;
        } else{
            context.lineWidth = THIN_LINE_WIDTH;
        }
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke()
    }
    
}

drawBoard();

// Refresh
var x_position = 10
var y_position = 10
const radius = 10

var moving = false

draw()

function draw() {
    // clear canvas
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // draw grid
    drawBoard();

    // refresh latex
    refresh_latex();

    // Draw circle
    // context.beginPath();
    // context.arc(x_position, y_position, radius, 0, Math.PI * 2, true);
    context.fillStyle = '#22cccc';
    context.strokeStyle = '#009999';
    // context.fill();
    // context.stroke();

    // Debug circle's position
    debug_text.innerText = `x: ${((x_position-canvas.width/2)/GRID_SIZE).toFixed(2)}, y: ${((y_position-canvas.height/2)/GRID_SIZE).toFixed(2)}`

    // Draw first arrow
    context.strokeStyle = '#9dff00';
    drawArrow(context, canvas.width / 2, canvas.height / 2, x_position, y_position)

    // Draw second arrow
    context.strokeStyle = '#009999';
    var v_pos_x = x_position + ((x_position>=canvas.width/2)*2-1) * Math.sqrt((x_position - canvas.width/2)**2 + (y_position - canvas.height/2)**2)
    var v_pos_y = y_position
    drawArrow(context, x_position, y_position, v_pos_x, v_pos_y);

    // Draw third arrow
    context.strokeStyle = '#009999';
    drawArrow(context, canvas.width / 2, canvas.height / 2, v_pos_x, v_pos_y);


    var v_x = v_pos_x - canvas.width/2
    var v_y = v_pos_y - canvas.height/2
    var v_len = Math.sqrt(v_x**2 + v_y**2)
    v_x /= v_len
    v_y /= v_len
    drawArrow(context, canvas.width / 2, canvas.height / 2, canvas.width/2 + v_x*GRID_SIZE, canvas.height/2 + v_y*GRID_SIZE);

    
    // Draw fourth arrow (hasil reflection)
    context.strokeStyle = '#ff0000';
    var x_x = x_position - canvas.width/2
    var x_y = y_position - canvas.height/2

    var dot = x_x*v_x + x_y*v_y
    var r_x = x_x - 2*dot*v_x
    var r_y = x_y - 2*dot*v_y
    drawArrow(context, canvas.width / 2, canvas.height / 2, canvas.width / 2 + r_x, canvas.height / 2+ r_y)

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

function drawArrow(context, fromx, fromy, tox, toy) {
    // setup
    context.beginPath();
    context.lineWidth = 3;

    // Draw line
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.stroke();

    // Draw arrowhead
    var endRadians = Math.atan((toy - fromy) / (tox - fromx));
    endRadians += ((tox - fromx > 0) ? 90 : -90) * Math.PI / 180;
    drawArrowhead(context, tox, toy, endRadians);

}

function drawArrowhead(context, x, y, radians) {
    const SCALE = 1

    context.fillStyle = context.strokeStyle;

    context.save();
    context.beginPath();
    context.translate(x, y);
    context.rotate(radians);
    context.moveTo(0, 0);
    context.lineTo(5*SCALE, 10*SCALE);
    context.lineTo(-5*SCALE, 10*SCALE);
    context.closePath();
    context.restore();
    context.fill();
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

    draw()
}

function up(e){
    moving = false
}


window.onmousemove = move;
window.onmousedown = down;
window.onmouseup = up;