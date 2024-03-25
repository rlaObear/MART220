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
    // properties

    // function
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
        return collideRectRect(this.x - this.w/2 , this.y - h2/2, this.w, this.h, x2,y2,w2,h2);

    }
}