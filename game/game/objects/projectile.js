class Projectile {
    constructor(playerX, playerY, directionX, directionY, speed, skin, hitbox) {
        this.x = playerX;
        this.y = playerY;
        this.directionX = directionX;
        this.directionY = directionY;
        this.speed = speed;
        this.skin = skin;
        this.hitbox = hitbox;
    }

    moveProjectile() {
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;
        this.hitbox.updateHitbox(this);
    }
}