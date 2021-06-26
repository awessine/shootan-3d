class Hitbox {
    constructor(hitbox) {
        this.x = hitbox.x;
        this.y = hitbox.y;
        this.width = hitbox.width;
        this.height = hitbox.height;
    }

    checkCollision(object) {
        return (this.x <= (object.x + object.width) && (this.x + this.width) >= object.x && this.y <= (object.y + object.height) && (this.y + this.height) >= object.y);
    }

    updateHitbox(object) {
        this.x = object.x;
        this.y = object.y;
    }
}