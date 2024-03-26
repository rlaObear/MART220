class animationImage {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.currentAnimation;
        this.createAnimation();
        this.direction = "";
        this.hasCollided = false;
    }

    getX() {
        return this.x;
    }

    setX(x) {
        this.x = x;
    }

    setCurrentFrameCount(currentFrameCount) {
        this.currentFrameCount = currentFrameCount;
    }

    createAnimation() {
        this.currentAnimation = new Sprite(this.x, this.y);
        this.currentAnimation.rotation = 0;
        this.currentAnimation.frameDelay=500;
    }

    myLoadAnimation(animationType, fileNames) {
        this.currentAnimation.addAnimation(animationType, fileNames[0], fileNames[fileNames.length - 1]);
        // set the hit box
        this.currentAnimation.width = 200;
        this.currentAnimation.height = 150;
    }


    drawAnimation(animationType) {
         
        this.currentAnimation.scale = .5;
        this.currentAnimation.changeAnimation(animationType);
        this.currentAnimation.rotation = 0;

        if(this.hasCollided)
        {
            this.currentAnimation.speed = 0;
            this.currentAnimation.velocity.x = 0;
            this.currentAnimation.velocity.y = 0;
        }
        else
        {
            this.currentAnimation.speed = 2;
        }
        
        if (animationType == 'walk' && this.direction == 'forward') {
            this.currentAnimation.direction = 0;
            this.currentAnimation.mirror.x = false;
        }
        else if (animationType == 'walk' && this.direction == 'reverse') {
            this.currentAnimation.mirror.x = true;
            this.currentAnimation.direction = 180;
        }
        else if (animationType == 'walk' && this.direction == 'up') {
            this.currentAnimation.direction = 270;
        }
        else if (animationType == 'walk' && this.direction == 'down') {
            this.currentAnimation.direction = 90;
        }

        else {
            this.currentAnimation.velocity.x = 0;
            this.currentAnimation.velocity.y = 0;  
        }
    }

    updatePosition(direction) {
        this.direction = direction;  
    }

    isColliding(myImage) {
        this.hasCollided =  this.currentAnimation.collide(myImage);
        return this.hasCollided;
    }
}