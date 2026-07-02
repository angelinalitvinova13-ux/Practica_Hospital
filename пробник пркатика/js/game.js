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