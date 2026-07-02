class Player{

    constructor(){

        this.x = 600;
        this.y = 400;

        this.width = 450;
        this.height = 450;

        this.walkSpeed = 4;
        this.runSpeed = 12;

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

        for(let i=0;i<8;i++){

            const img = new Image();
            img.src = `assets/run/run${i}.png`;
            this.runFrames.push(img);

        }

    }

update() {
    let speed = keys["ShiftLeft"] || keys["ShiftRight"] ? this.runSpeed : this.walkSpeed;
    let moving = false;

    if (keys["KeyW"]) { this.y -= speed; this.direction = "up"; moving = true; }
    if (keys["KeyS"]) { this.y += speed; this.direction = "down"; moving = true; }
    if (keys["KeyA"]) { this.x -= speed; this.direction = "left"; moving = true; }
    if (keys["KeyD"]) { this.x += speed; this.direction = "right"; moving = true; }

    // Ограничение игрока внутри мира
    this.x = Math.max(0, Math.min(this.x, currentMap.width - this.width));
this.y = Math.max(0, Math.min(this.y, currentMap.height - this.height));

    if (moving) {
        this.timer++;
        if (this.timer > 6) {
            this.frame = (this.frame + 1) % 8; // Цикличность кадров
            this.timer = 0;
        }
    } else {
        this.frame = 0;
    }
}

draw(ctx, camera) { // Передаем камеру сюда
    const isRunning = keys["ShiftLeft"] || keys["ShiftRight"];
    const frames = isRunning ? this.runFrames : this.walkFrames;
    const img = frames[this.frame];
    if (!img.complete) return; 

    ctx.save();
    
    // Вычисляем позицию на экране относительно камеры
    const screenX = this.x - camera.x;
    const screenY = this.y - camera.y;

    if (this.direction === "left") {
        ctx.scale(-1, 1);
        ctx.drawImage(img, -screenX - this.width, screenY, this.width, this.height);
    } else {
        ctx.drawImage(img, screenX, screenY, this.width, this.height);
    }
    ctx.restore();
}
}
