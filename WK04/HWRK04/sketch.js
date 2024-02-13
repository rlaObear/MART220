//thunder player//
var pick;
//thunder location at start//
var xImage = 100, yImage = 100;
var speedX, speedY;
var myFont;
//Game timer//
var myTime = 10;
//rothgar_chaser//
var pick2;
//rothgar location at start//
var xImage2 = 500, yImage2 = 25;
var speedX2, speedY2;
//Flag to display Ouch//
var displayOuch = false;
var ouchDisplayTime = 0;
//Flag to display level complete//
var levelComplete = false;

function setup() {
    createCanvas(1000, 700);
    pick = loadImage("images/rothgar.png");
    pick2 = loadImage("images/thunder.png");
    myFont = loadFont("fonts/ProtestRiot-Regular.ttf");
    speedX = random(1, 5);
    speedY = random(1, 5);
    speedX2 = random(1, 5);
    speedY2 = random(1, 5);

    setInterval(changeTime, 1000);
}

function draw() {
    background(164, 109, 207);
    image(pick, xImage, yImage);

    xImage += speedX;
    yImage += speedY;

    if (xImage >= width - 100 || xImage <= 0) {
        speedX *= -1;
    }

    if (yImage >= height - 100 || yImage <= 0) {
        speedY *= -1;
    }

    // Draw the "thunder.png" image
    image(pick2, xImage2, yImage2);
    // Check bounds for thunder.png
        if (xImage2 >= width - 100) {
            xImage2 = width - 100;
        } else if (xImage2 <= 0) {
            xImage2 = 0;
        }

    // Check for collision and display "Ouch!!!" text
    if (checkCollision(xImage, yImage, 100, 100, xImage2, yImage2, 100, 100)) {
        speedX *= -1;
        speedY *= -1;
        speedX2 *= -1;
        speedY2 *= -1;
// Set the flag to true
        displayOuch = true; 
// Record the time when Ouch is displayed
        ouchDisplayTime = millis(); 

        myTime = 10;
    }

    if (displayOuch) {
        fill(36, 250, 100); // Set the fill color to white
        textSize(30);
        text('Ouch!', xImage2 - 50, yImage2 - 50);

        // Check if 2 seconds have passed since Ouch was displayed
        if (millis() - ouchDisplayTime > 2000) {
            displayOuch = false; // Reset the flag after 3 seconds
        }
    }

    fill(100, 252, 169);
    textSize(24);
    textFont(myFont);

    if (myTime > 0) {
        fill(36, 250, 100);
        textSize(15);
        text(myTime + " seconds", 50, 50);
    } else {
        if (!levelComplete) {
            fill(36, 250, 100);
            textSize(24);
            text("You made it! Next Level!!", 375, 300);
            levelComplete = true; // Set the flag to true once the message is displayed
        }
    }
}

function checkCollision(x, y, w, h, x2, y2, w2, h2) {
    if (
        x - w / 2 < x2 + w2 / 2 &&
        x + w / 2 > x2 - w2 / 2 &&
        y - h / 2 < y2 + h2 / 2 &&
        y + h / 2 > y2 - h2 / 2
    ) {
        return true;
    } else {
        return false;
    }
}

function changeTime() {
    myTime--;
    if (myTime <= 0) {
        myTime = 10;
        speedX *= 2;
        speedY *= 2;
        speedX2 *= 2;
        speedY2 *= 2;

        // If no collision occurred within 10 seconds, set levelComplete to true
        if (!levelComplete) {
            levelComplete = true;
            fill(36, 250, 100);
            textSize(24);
            text("You made it! Next Level!!", 375, 300);
        }
    }
}

function keyPressed() {
    if (key == 'w') {
        yImage2 -= 20;
        yImage -= 50;
    }
    if (key == 'a') {
        xImage2 -= 20;
        xImage -= 50;
    }
    if (key == 's') {
        yImage2 += 20;
        yImage += 50;
    }
    if (key == 'd') {
        xImage2 += 20;
        xImage += 50;
    }
}