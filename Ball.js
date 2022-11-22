import { $, canvas, ctx } from "./tools.js";

export class Ball{
    constructor(x, y, r, vel = 8){
        this.vel = vel;
        this.reset(x, y, r)
    }

    reset(x = canvas.width/2, y = canvas.height/2, r = 15){
        this.x = x;
        this.y = y;
        this.r = r;
        this.dir = Math.random() * (Math.PI * 0.33 - Math.PI * 0.03) + Math.PI * 0.03;
        //this.dir = Math.PI ;
        if(Math.random() < 0.5) this.dir = - this.dir;
        if(Math.random() < 0.5) this.dir = Math.PI - this.dir;
        this.velx = this.vel * Math.cos(this.dir);
        this.vely = this.vel * Math.sin(this.dir);
    }

    update(players){
        const prevX = this.x;
        const prevY = this.y;
        this.x += this.velx;
        this.y += this.vely;
        if(this.checkCollissionWithPlayers(players)) {
            //this.dir = Math.PI - this.dir;
            //this.dir += Math.random() * Math.PI * 0.04 - Math.PI * 0.02;
            //this.velx = this.vel * Math.cos(this.dir);
            //this.vely = this.vel * Math.sin(this.dir); 
            this.velx = -this.velx
        }
        else if(this.y + this.r > canvas.height || this.y - this.r < 0){
            this.x = prevX;
            this.y = prevY;
            this.vely = - this.vely;
        }else if(this.x + this.r + this.vel< 0){
            $(".jugador2 .value").textContent = ++players[1].aciertos;
            this.reset();
        }else if(this.x - this.r -this.vel > canvas.width){
            $(".jugador1 .value").textContent = ++players[0].aciertos;
            this.reset();
        }
    }

    checkCollissionWithPlayers(players){
        for(const player of players){
            if(player.checkCollissionWithBall(this)) return true;
        }
        return false
    }

    show(){
        //ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
}