const canvas = $("canvas")[0]
const context = canvas.getContext('2d');
const debug_text = $("#debug-text")[0];
const latex_text = $("h4")[0];


// Setup Canvas Size
canvas.width = 400
canvas.height = 400


// Setup Grid Size
const GRID_SIZE = 40;
centerGrid =  new CenterGrid(canvas, GRID_SIZE)


var p
var theta
var J
var Jp

// mouse position
var x_position = 5
var y_position = 5
const radius = 10

var moving = false

// Givens
function givens(){

    centerGrid.clear()


    // Get Vector p
    grid_pos = centerGrid.canvasToGrid(x_position, y_position);
    p = [grid_pos.x, grid_pos.y];

    // Draw arrow origin to p
    context.lineWidth = 3;
    context.strokeStyle = '#9dff00';
    centerGrid.drawArrow(0, 0, p[0], p[1]);

    // Compute J
    let r = Math.sqrt(p[0]**2+p[1]**2);
    let cos = p[0]/r;
    let sin = p[1]/r;
    theta = Math.atan2(sin, cos);
    J = [[cos, sin], [-sin, cos]];

    // Compute Jp
    Jp = [J[0][0]*p[0]+J[0][1]*p[1], J[1][0]*p[0]+J[1][1]*p[1]];

    // Draw arrow from origin to Jp
    context.strokeStyle = '#ff0000';
    centerGrid.drawArrow(0, 0, Jp[0], Jp[1]);

    // Draw arc from vector p to Jp
    context.fillStyle = '#98A538';
    centerGrid.drawArc(0, 0, 20, 0, theta, true);
    centerGrid.drawArc(0, 0, Math.abs(Jp[0]*GRID_SIZE), 0, theta, false);

    // refresh latex
    refresh_latex();

}


function refresh_latex(){
    detJ = J[0][0]*J[1][1] - J[0][1]*J[1][0];

    katex.render(String.raw`

        p =
        \begin{bmatrix}
        ${(p[0]).toFixed(2)} \\
        ${(p[1]).toFixed(2)}
        \end{bmatrix}\\

        \theta = ${(theta*180/Math.PI).toFixed(2)} \degree \\

        J = 
        \begin{bmatrix}
        ${J[0][0].toFixed(2)} & ${J[0][1].toFixed(2)}\\
        ${J[1][0].toFixed(2)} & ${J[1][1].toFixed(2)}
        \end{bmatrix}\\

        det(J) = ${detJ.toFixed(2)}\\

        Jp = 
        \begin{bmatrix}
        ${Jp[0].toFixed(2)} \\
        ${(Jp[1].toFixed(2)==0 ? 0 : Jp[1].toFixed(2)) }
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


    givens()
}

function up(e){
    moving = false
}


window.onmousemove = move;
window.onmousedown = down;
window.onmouseup = up;
