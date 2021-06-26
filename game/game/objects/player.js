class Player {
    constructor(player) {
        this.id = player.id;
        this.name = player.name;
        this.x = player.x;
        this.y = player.y;
        this.skin = player.skin;
        this.hitbox = new Hitbox(player.hitbox);
        this.step = player.step;
        this.projectiles = player.projectiles;
        this.killCounter = player.killCounter;
        this.state = player.state;
    }

    moveUp(upPressed) {
        if (upPressed) {
            this.y -= this.step;
            this.hitbox.updateHitbox(this);
        }
    }

    moveDown(downPressed) {
        if (downPressed) {
            this.y += this.step;
            this.hitbox.updateHitbox(this);
        }
    }

    moveLeft(leftPressed) {
        if (leftPressed) {
            this.x -= this.step;
            this.hitbox.updateHitbox(this);
        }
    }

    moveRight(rightPressed) {
        if (rightPressed) {
            this.x += this.step;
            this.hitbox.updateHitbox(this);
        }
    }
}