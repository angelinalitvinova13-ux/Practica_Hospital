class Player{

    constructor(){

        this.x = 600;
        this.y = 400;

        this.width = 512;
        this.height = 512;

        this.walkSpeed = 4;
        this.runSpeed = 10;

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

    if (moving) {
        this.timer++;
        if (this.timer > 6) {
            this.frame++;
            this.timer = 0;
        }
    } else {
        this.frame = 0;
    }
}

draw(ctx) {
    // Проверяем новые коды клавиш
    const isRunning = keys["ShiftLeft"] || keys["ShiftRight"];
    const frames = isRunning ? this.runFrames : this.walkFrames;
    
    // Безопасная проверка: если картинки еще не загрузились, не пытаемся их рисовать
    const img = frames[this.frame % frames.length];
    if (!img.complete) return; 

    ctx.save();

    if (this.direction === "left") {
        ctx.scale(-1, 1);
        ctx.drawImage(img, -this.x - this.width, this.y, this.width, this.height);
    } else {
        ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }

    ctx.restore();
}

}