
class ImmovableObject {
    constructor(img, x, y, w, h) {
        this.img = loadImage(img);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        image(this.img, this.x, this.y, this.w, this.h);
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