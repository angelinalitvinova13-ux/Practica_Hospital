class Player {

    constructor() {

        this.x = 600;
        this.y = 400;

        this.width = 450;
        this.height = 450;

        this.walkSpeed = 4.8;
        this.runSpeed = 12;

        this.frame = 0;
        this.timer = 0;

        this.direction = "right";

        this.walkFrames = [];
        this.runFrames = [];
        this.idleFrames = [];

        for (let i = 0; i < 8; i++) {

            let img = new Image();
            img.src = `assets/walk/walk${i}.png`;
            this.walkFrames.push(img);

        }

        for (let i = 0; i < 8; i++) {

            let img = new Image();
            img.src = `assets/run/run${i}.png`;
            this.runFrames.push(img);

        }

        for (let i = 0; i < 8; i++) {

            let img = new Image();
            img.src = `assets/idle/idle${i}.png`;
            this.idleFrames.push(img);

        }

    }

    update() {

        const isRunning = keys["ShiftLeft"] || keys["ShiftRight"];
        const speed = isRunning ? this.runSpeed : this.walkSpeed;

        let moving = false;

        if (keys["KeyA"]) {

            this.x -= speed;
            this.direction = "left";
            moving = true;

        }

        if (keys["KeyD"]) {

            this.x += speed;
            this.direction = "right";
            moving = true;

        }

        this.x = Math.max(0, Math.min(this.x, currentMap.width - this.width));

        this.timer++;

        // Скорость анимации
        let animationSpeed = 6;

        // Idle обычно выглядит лучше немного медленнее
        if (!moving)
            animationSpeed = 12;

        if (this.timer >= animationSpeed) {

            this.timer = 0;
            this.frame = (this.frame + 1) % 8;

        }

    }

    draw(ctx, camera) {

        let frames;

        if (keys["KeyA"] || keys["KeyD"]) {

            frames = (keys["ShiftLeft"] || keys["ShiftRight"])
                ? this.runFrames
                : this.walkFrames;

        } else {

            frames = this.idleFrames;

        }

        const img = frames[this.frame];

        if (!img.complete) return;

        const screenX = this.x - camera.x;
        const screenY = this.y - camera.y;

        ctx.save();

        if (this.direction === "left") {

            ctx.scale(-1, 1);

            ctx.drawImage(
                img,
                -screenX - this.width,
                screenY,
                this.width,
                this.height
            );

        } else {

            ctx.drawImage(
                img,
                screenX,
                screenY,
                this.width,
                this.height
            );

        }

        ctx.restore();

    }

}
