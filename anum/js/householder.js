const canvas = $("canvas")[0]
const context = canvas.getContext('2d');
const debug_text = $("h3")[0]

// Setup Canvas size
canvas.width = 500
canvas.height = 500

// Create Grid
function drawBoard(){
    const GRID_SIZE = 40;
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

    // Draw circle
    // context.beginPath();
    // context.arc(x_position, y_position, radius, 0, Math.PI * 2, true);
    context.fillStyle = '#22cccc';
    context.strokeStyle = '#009999';
    // context.fill();
    // context.stroke();

    // Debug circle's position
    debug_text.innerText = `x: ${x_position}, y: ${y_position}`

    // Draw line from center to circle
    context.beginPath();
    context.lineWidth = 5;
    context.moveTo(canvas.width / 2, canvas.height / 2);
    context.lineTo(x_position, y_position);
    context.stroke();

    // Draw arrowhead
    var endRadians = Math.atan((y_position - canvas.height / 2) / (x_position - canvas.width / 2));
    endRadians += ((x_position > canvas.width / 2) ? 90 : -90) * Math.PI / 180;
    drawArrowhead(context, x_position, y_position, endRadians);

}

function drawArrowhead(context, x, y, radians) {
    const SCALE = 2
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