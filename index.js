import { Ball } from "./Ball.js";
import { Slider } from "./Slider.js";
import { canvas, ctx } from "./tools.js";

let ball;
let jugadores = []
const setUp = () =>{
    ball = new Ball();
    jugadores = [
        new Slider(1),
        new Slider(2),
    ]
}


let pause = false;
let frame = 0;
const draw = () =>{
    
    if(!pause) requestAnimationFrame(draw);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    jugadores.forEach(j =>{
        j.update();
        j.show();
    })
    ball.update(jugadores);
    ctx.fillStyle = `hsl(${frame%360}, 100%, 50%)`
    ball.show();
    frame++
}

const resizeCanvas = () =>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

addEventListener("resize", resizeCanvas);

resizeCanvas();
setUp();
draw();

addEventListener("keydown", (e)=>{
    e.preventDefault();
    if(e.code === "Escape") {
        pause = !pause;
        if(!pause) draw();
    }
})