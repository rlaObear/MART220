//Thunder_player
var pick;
var xImage = 100, yImage = 100;
var speedX, speedY;
//Rothgar_chaser
var pick2;
var xImage2 = 500, yImage2 = 25;
var speedX2, speedY2;
//Orchid_3rd_image
var pick3;
var xImage3 = 300, yImage3 = 25;

var myFont;

var myTime = 10;

var displayOuch = false;
var ouchDisplayTime = 0;

function setup() {
    createCanvas(1000, 700);
    pick = loadImage("images/rothgar.png");
    pick2 = loadImage("images/thunder.png");
    pick3 = loadImage("images/orchid.png");

    myFont = loadFont("fonts/ProtestRiot-Regular.ttf");

    speedX = random(1, 5);
    speedY = random(1, 5);
    speedX2 = random(1, 5);
    speedY2 = random(1, 5);
//Game timer
    setInterval(changeTime, 1000);
}

function draw() 
{
    background(164, 109, 207);
    
    image(pick, xImage, yImage);
    xImage += speedX;
    yImage += speedY;
    if (xImage >= width - 100 || xImage <= 0) 
    {
        speedX *= -1;
    }
    if (yImage >= height - 100 || yImage <= 0) 
    {
        speedY *= -1;
    }

    image(pick2, xImage2, yImage2);
    if (xImage2 >= width - 100) 
    {
        xImage2 = width - 100;
    } else if (xImage2 <= 0)
    {
        xImage2 = 0;
    }
    image(pick3, xImage3, yImage3);
    

// Check for collision and display "Ouch!!!" text
    if (checkCollision(xImage, yImage, 100, 100, xImage2, yImage2, 100, 100))
    {
    speedX *= -1;
    speedY *= -1;
    speedX2 *= -1;
    speedY2 *= -1;

    displayOuch = true;
    
    myTime = 10;
    }

    if (displayOuch) {
        fill(36, 250, 100);
        textSize(30);
        text('Ouch!', xImage2 - 0, yImage2 - 0);
    }

    if (myTime > 0) 
    {
        fill(36, 250, 100);
        textSize(15);
        text(myTime + " seconds", 50, 50);
    }
}

function checkCollision(x, y, w, h, x2, y2, w2, h2) {
    if 
    (
    x - w / 2 < x2 + w2 / 2 &&
    x + w / 2 > x2 - w2 / 2 &&
    y - h / 2 < y2 + h2 / 2 &&
    y + h / 2 > y2 - h2 / 2
    )
    {
    return true;
    } else 
    {
    return false;
    }
}

function changeTime() 
{
    myTime--;
    if (myTime <= 0) 
    {
    myTime = 10;
    speedX *= 2;
    speedY *= 2;
    speedX2 *= 2;
    speedY2 *= 2;
// If no collision occurred within 10 seconds, set levelComplete to true
    if (!levelComplete) 
    {
        levelComplete = true;
        fill(36, 250, 100);
        textSize(24);
        text("You made it! Next Level!!", 375, 300);
    }
    }
}

function keyPressed()
{
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