import { keysPressed } from "./keydown.js";
import { canvas, ctx } from "./tools.js";

const PARAMETERS= {
    1: {
        controls: ["KeyW", "KeyS"],
    },
    2: {
        controls: ["ArrowUp", "ArrowDown"],
    }
}
const GAP = 50;
export class Slider{
    constructor(jugador = 1, vel = 7){
        this.jugador = jugador;
        this.w = 10;
        this.h = 100;
        this.vel = vel;
        this.aciertos = 0;
        this.reset();
    }

    reset(){
        this.y = canvas.height * 0.5;
    }

    update(){
        const [up, down] = PARAMETERS[this.jugador].controls;
        if(keysPressed[up]) this.y -= this.vel;
        else if(keysPressed[down]) this.y += this.vel;
        if(this.y + this.h * 0.5 > canvas.height) return this.y = canvas.height - this.h * 0.5;
        else if(this.y - this.h * 0.5 < 0) return this.y = this.h * 0.5;
    }

    checkCollissionWithBall(ball){
        const heightRange = this.y + this.h * 0.5 > ball.y - ball.r * 0.5 && this.y - this.h *0.5 < ball.y + ball.r * 0.5
        if(this.jugador === 1){
            return this.x + this.w >= ball.x - ball.r && this.x + this.w < ball.x - ball.r - ball.velx * 0.99 && heightRange;
        }
        else{
            return this.x <= ball.x + ball.r && this.x > ball.x + ball.r - ball.velx * 0.99 && heightRange;
        }
    }

    get x(){
        return this.jugador === 1 ? GAP : canvas.width - this.w - GAP;
    }
    show(){
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y - this.h * 0.5, this.w, this.h);
    }


}