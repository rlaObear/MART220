class myFood {
    // constructor
    constructor(myFileName, x, y, w, h) {
        this.characterImage = loadImage(myFileName);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.flipX = false; 
    }
    
    // draw method
    draw() {

        image(this.characterImage, this.x, this.y, this.w, this.h);
    }

    updateX(x) {
        this.x = x;
    }

    checkCollision(x3, y3, w3, h3) {
        if (
            this.x < x3 + w3 &&
            this.x + this.w > x3 &&
            this.y < y3 + h3 &&
            this.y + this.h > y3
        ) {
            return true;
        } else {
            return false;
        }
    }
}