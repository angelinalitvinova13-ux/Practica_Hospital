// Добавьте переменные камеры
let camera = { x: 0, y: 0 };

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player();

// В game.js
let currentMap = new Map("assets/map/room1.png", 3000, 1080); 

function gameLoop() {

    player.update(currentMap);

    camera.x = player.x - canvas.width / 2 + player.width / 2;
    camera.y = player.y - canvas.height / 2 + player.height / 2;

    camera.x = Math.max(0, Math.min(camera.x, currentMap.width - canvas.width));
    camera.y = Math.max(0, Math.min(camera.y, currentMap.height - canvas.height));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    currentMap.draw(ctx, camera);
    player.draw(ctx, camera);

    requestAnimationFrame(gameLoop);
}

gameLoop();
