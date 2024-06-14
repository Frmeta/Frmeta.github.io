const canvas = $("canvas")[0]
const context = canvas.getContext('2d');
const debug_text = $("h3")[0]

// Windows Resizer
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
// window.onresize = resize;

canvas.width = 500
canvas.height = 500
canvas.style.border = "1px solid #000"
canvas.style.padding = "1px"
//resize();

// Refresh
var x = 10
var y = 10
const radius = 10

var offset = undefined
var moving = false

draw()

function draw() {
    // clear canvas
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);


    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.fillStyle = '#22cccc';
    context.strokeStyle = '#009999';
    context.fill();
    context.stroke();

    debug_text.innerText = `x: ${x}, y: ${y}`
}

function down(e){
    offset = {x: e.x - x, y: e.y - y}
    moving = true
}

function move(e) {
    if (!moving) return
    x = e.x - offset.x
    y = e.y - offset.y

    // clamp
    x = Math.max(x, 0)
    x = Math.min(x, canvas.width)
    y = Math.max(y,0)
    y = Math.min(y, canvas.height)

    draw()
}

function up(e){
    offset = undefined
    moving = false
}


window.onmousemove = move;
window.onmousedown = down;
window.onmouseup = up;