const keys = {};

window.addEventListener("keydown", e=>{

    keys[e.key.toLowerCase()] = true;

});

window.addEventListener("keyup", e=>{

    keys[e.key.toLowerCase()] = false;

});

class Player{

    constructor(){

        this.x = 600;
        this.y = 400;

        this.width = 64;
        this.height = 64;

        this.walkSpeed = 3;
        this.runSpeed = 6;

        this.frame = 0;
        this.timer = 0;

        this.direction = "down";

        this.walkFrames = [];
        this.runFrames = [];

        for(let i=0;i<8;i++){

            const img = new Image();
            img.src = `assets/walk/walk${i}.png`;
            this.walkFrames.push(img);

        }

        for(let i=0;i<9;i++){

            const img = new Image();
            img.src = `assets/run/run${i}.png`;
            this.runFrames.push(img);

        }

    }

    update(){

        let speed = keys["shift"] ? this.runSpeed : this.walkSpeed;

        let moving = false;

        if(keys["w"]){

            this.y-=speed;
            this.direction="up";
            moving=true;

        }

        if(keys["s"]){

            this.y+=speed;
            this.direction="down";
            moving=true;

        }

        if(keys["a"]){

            this.x-=speed;
            this.direction="left";
            moving=true;

        }

        if(keys["d"]){

            this.x+=speed;
            this.direction="right";
            moving=true;

        }

        if(moving){

            this.timer++;

            if(this.timer>6){

                this.frame++;
                this.timer=0;

            }

        }else{

            this.frame=0;

        }

    }

    draw(ctx){

        let frames = keys["shift"] ? this.runFrames : this.walkFrames;

        ctx.drawImage(

            frames[this.frame%frames.length],
            this.x,
            this.y,
            this.width,
            this.height

        );

    }

}

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player();

function gameLoop(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    player.update();

    player.draw(ctx);

    requestAnimationFrame(gameLoop);

}

gameLoop();

window.addEventListener("resize",()=>{

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});