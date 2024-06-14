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
