class animationImage {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.currentAnimation;
        this.createAnimation();
        this.direction = "";
    }

    createAnimation() {
        this.currentAnimation = createSprite(this.x, this.y);
    }

    getCurrentAnimation() {
        return this.currentAnimation;
    }

    loadAnimation(animationType, fileNames) {
        this.currentAnimation.addAnimation(animationType, fileNames[0], fileNames[fileNames.length - 1]);
        this.currentAnimation.width = 300;
        this.currentAnimation.height = 150;
    }

    drawAnimation(animationType) {
        this.currentAnimation.frameDelay = 5;
        this.currentAnimation.scale = .15;
        this.currentAnimation.changeAnimation(animationType);
        
        // Handle movement based on direction and animation type
        if (animationType == 'walk' && this.direction == 'forward') {
            this.currentAnimation.direction = 0;
            this.currentAnimation.mirror.x = false;
            this.currentAnimation.speed = 1;
        } else if (animationType == 'walk' && this.direction == 'reverse') {
            this.currentAnimation.mirror.x = true;
            this.currentAnimation.direction = 180;
            this.currentAnimation.speed = 1;
        } else {
            this.currentAnimation.velocity.x = 0;
            this.currentAnimation.velocity.y = 0;
            this.currentAnimation.rotation = 0;
        }
    }

    updatePosition(direction) {
        this.direction = direction;
        if (direction === 'climb') {
            if (kb.pressing('w')) {
                this.currentAnimation.position.y -= 5; // Move up
            } else if (kb.pressing('s')) {
                this.currentAnimation.position.y += 5; // Move down
            }
        } else if (direction === 'forward') {
            this.currentAnimation.position.x += 5; // Move forward
        } else if (direction === 'reverse') {
            this.currentAnimation.position.x -= 5; // Move backward
        }
    }

    isColliding(myImage) {
        return this.currentAnimation.collide(myImage);
    }

    // Add setPosition method
    setPosition(x, y) {
        this.currentAnimation.position.x = x;
        this.currentAnimation.position.y = y;
    }
}
