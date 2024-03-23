class myFood {

    // constructor
    constructor(myFileName, x, y, w, h) {

        this.characterImage = loadImage(myFileName);
        this.myImageObject
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        
    }
    // properties

    // functions
    draw() {
        this.characterImage.resize(this.w/3, this.h/3);
        if (this.flipX) {
            push();
            scale(-1, 1);
            image(this.characterImage, -this.x - this.w / 3, this.y);
            pop();
        }
        else {
            image(this.characterImage, this.x, this.y);

        }

    }
    
    updateX(x) {
        this.x = x;
    }

    checkCollision(x3, y3, w3, h3) {

        if (
            this.x - this.w / 3 < x3 + w3 / 3 &&
            this.x-this.w/4 + w3 / 3 > x3 - this.w / 3 &&
            this.y-this.h/4 - h3 / 3 < y3 + this.h / 3 &&
            this.y-this.h/4 + h3 / 3 > y3 - this.h / 3
    
        ) {
            return true;
        } else {
            return false;
        }
    }
}