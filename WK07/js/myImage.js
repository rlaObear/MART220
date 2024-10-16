class myImage {

    // constructor
    constructor(myFileName, x, y, w, h) {

        this.characterImage = loadImage(myFileName);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        
    }
    // properties

    // functions
    updateX(x) {
        this.x = x;
    }

    updateFlip(flipX) {
        this.flipX = flipX;
    }
    draw() {
        this.characterImage.resize(this.w/4, this.h/3);
        if (this.flipX) {
            push();
            scale(-1, 1);
            image(this.characterImage, -this.x - this.w / 2, this.y);
            pop();
        }
        else {
            image(this.characterImage, this.x, this.y);

        }

    }

    checkCollision(x2, y2, w2, h2) {

        if (
            this.x - this.w / 2 < x2 + w2 / 2 &&
            this.x-this.w/4 + w2 / 2 > x2 - this.w / 2 &&
            this.y-this.h/4 - h2 / 2 < y2 + this.h / 2 &&
            this.y-this.h/4 + h2 / 2 > y2 - this.h / 2
    
        ) {
            return true;
        } else {
            return false;
        }
    }
}