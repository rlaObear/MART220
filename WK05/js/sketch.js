var xImage = 50, yImage = 200;
var myFont;
var myTime = 10;
var i = 0;
var flipX = false;
var idleStrings = [];
var walkStrings = [];
var idleArray = [];
var walkArray = [];
var objectToEat;
var objectToDraw;
var score = 0;

function preload() {
    idleStrings = loadStrings("../textfiles/idle.txt");
    walkStrings = loadStrings("../textfiles/walk.txt");
}

function setup() {
    createCanvas(600, 600);

    for (let k = 0; k < idleStrings.length; k++) {
        idleArray.push(new myImage(idleStrings[k], 50, 200, 680, 472));
    }
    for (let k = 0; k < walkStrings.length; k++) {
        walkArray.push(new myImage(walkStrings[k], 50, 200, 680, 472));
    }

    objectToEat = new myFood("../images/orchid.png", 500, 200, 100, 100);
    
    myFont = loadFont("fonts/ProtestRiot-Regular.ttf");

    setInterval(changeTime, 100);
    setInterval(countDown, 1000);
}
function draw() {
    background(120);

    if (objectToEat != null) {
        objectToEat.draw();
    }

    if (keyIsPressed) {
        if (key == "w") {
            yImage -= 1;
        }
        if (key == "s") {
            yImage += 1;
        }
        if (key == "a") {
            xImage -= 1;
            flipX = true;
        }
        if (key == "d") {
            xImage += 1;
            flipX = false;
        }
        for (var ii = 0; ii < idleArray.length; ii++) {
            idleArray[ii].updateX(xImage);
            idleArray[ii].updateFlip(flipX);
            walkArray[ii].updateX(xImage);
            walkArray[ii].updateFlip(flipX);
            idleArray[ii].y = yImage;
            walkArray[ii].y = yImage;
            
            if (objectToEat != null) {
                if (walkArray[ii].checkCollision(objectToEat.x, objectToEat.y, objectToEat.w, objectToEat.h)) {
                    objectToEat = null;
                }
            }

        }
        objectToDraw = walkArray;
    }
    else {
        objectToDraw = idleArray;     
    }

    objectToDraw[i].draw();

    fill(100, 252, 169);
    textSize(24);
    textFont(myFont);
    text("Score: " + score, 400, 50);
    

    fill(100, 252, 169);
    textSize(25);
    text(myTime + "Seconds", 50, 50);
}

function changeTime() {
    i++;
    if (i > idleArray.length - 1) {
        i = 0;
    }
}

function countDown() {
    myTime--;
    if (myTime < 0) {
        myTime = 10;
        createANewFoodItem();
    }
}

function createANewFoodItem()
{
    objectToEat = new myFood("../images/orchid.png", random(50, width-100), random(50,height-100), 100, 100);
}
