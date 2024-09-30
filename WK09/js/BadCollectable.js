class BadCollectable {

    constructor(x, y, w, h, image) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = image;
        this.isCollected = false;
        this.sprite = createSprite(this.x, this.y);
        this.sprite.addImage(this.image);
        this.sprite.width = this.w;
        this.sprite.height = this.h;
        this.sprite.scale = .05; 
    }
    draw() {
        if (!this.isCollected) {
        
        }
    }
    checkCollision(otherSprite) {
        if (!this.isCollected && this.sprite.collide(otherSprite)) {
            this.isCollected = true;
            this.sprite.remove();
            return true; 
        }
        return false;
    }
     getImage(){
        return this.image;
    }
}