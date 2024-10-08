var xImage = 50;
var yImage = 200;
var myFont;
var myClock = 10;
var changeTime = 100;
var countDown = 1000
var i = 0;
var flipX = false;
var idleArray = [];
var walkArray = [];
var deadArray = [];
var objectToEat;
var objectToAvoid;
var score = 0;
var gameDuration = 40;
var gameEndTime;
var gameEnded = false;
var backgroundSound;
var biteSound;
var objectToDraw 
let particles;
let button;

function preload() {
    loadStrings("textfiles/idle.txt", preloadIdle);
    loadStrings("textfiles/walk.txt", preloadWalk);
    loadStrings("textfiles/dead.txt", preloadDead);
    backgroundSound = loadSound("../sound/background.mp3");
    biteSound = loadSound("../sound/biteSound.wav");
    myFont = loadFont("fonts/ProtestRiot-Regular.ttf");
}
function preloadIdle(data) {
    for (var k = 0; k < data.length; k++) {
        idleArray.push(new myImage(data[k], xImage, yImage, 680, 472));
    }
}

function preloadWalk(data) {
    for (var k = 0; k < data.length; k++) {
        walkArray.push(new myImage(data[k], xImage, yImage, 680, 472));
    }
}
function preloadDead(data) {
    for (var k = 0; k < data.length; k++) {
        deadArray.push(new myImage(data[k], xImage, yImage, 680, 472));
    }
}

function setup() {
    createCanvas(800, 600);
    objectToEat = new myFood("images/orchid.png", 500, 200, 100, 100);
    objectToAvoid = new myFood("images/Thunder.png", 300, 200, 100, 100);
    setInterval(changeTime, 100);
    setInterval(countDown, 1000);
    gameEndTime = millis() + gameDuration * 1000;
    button = createButton('New');
    button.mousePressed(makeParticles);
    makeParticles();
}
function makeParticles() {
  if (particles) freeGeometry(particles);

  particles = buildGeometry(() => {
    for (let i = 0; i < 60; i++) {
      push();
      translate(
        randomGaussian(0, 20),
        randomGaussian(0, 20),
        randomGaussian(0, 20)
      );
      sphere(5);
      pop();
    }
  });

function draw() {
    background(208, 249, 247);
    //background(255);
    noStroke();
    lights();
    orbitControl();
    model(particles);

    if (objectToEat != null) {
        objectToEat.draw();
    }
    if (objectToAvoid != null) {
        objectToAvoid.draw();
    }

    handleKeyPress();

    if (!gameEnded) {
        objectToDraw = keyIsPressed ? walkArray : idleArray;
        objectToDraw[i].draw();

        fill(225, 33, 184 );
        textSize(24);
        textFont(myFont);
        text("Score: " + score, 400, 50);

        fill(225, 33, 184 );
        textSize(25);
        text(myClock + " Seconds", 50, 50);

        var remainingTime = max(0, (gameEndTime - millis()) / 1000);

        if (remainingTime <= 0) {
            gameEnded = true;
        } else {
            textSize(20);
            fill(225, 33, 184 );
            text("Time Left: " + ceil(remainingTime), 10, 20);
        }
    } else { 
        objectToDraw = deadArray;
        objectToDraw [i].draw();
        displayGameOver();

    }
    if (!gameEnded) {
        var objectToDraw = keyIsPressed ? walkArray : idleArray;
        objectToAvoid[i].draw();

        fill(225, 33, 184 );
        textSize(24);
        textFont(myFont);
        text("Score: " + score, 400, 50);

        fill(225, 33, 184 );
        textSize(25);
        text(myClock + " Seconds", 50, 50);

        var remainingTime = max(0, (gameEndTime - millis()) / 1000);

        if (remainingTime <= 0) {
            gameEnded = true;
        } else {
            textSize(20);
            fill(225, 33, 184 );
            text("Time Left: " + ceil(remainingTime), 10, 20);
        }
    } else {
        displayGameOver();
    }

}

function handleKeyPress() {
    if (keyIsPressed) {
        switch (key) {
            case 'w':
                yImage -= 1;
                break;
            case 's':
                yImage += 1;
                break;
            case 'a':
                xImage -= 1;
                flipX = true;
                break;
            case 'd':
                xImage += 1;
                flipX = false;
                break;
        }

        updateImagesPosition();
    }
}

function updateImagesPosition() {
    for (var ii = 0; ii < idleArray.length; ii++) {
        idleArray[ii].updateX(xImage);
        idleArray[ii].updateFlip(flipX);
        walkArray[ii].updateX(xImage);
        walkArray[ii].updateFlip(flipX);
        idleArray[ii].y = yImage;
        walkArray[ii].y = yImage;

        if (objectToEat) {
            if (walkArray[ii].checkCollision(objectToEat.x, objectToEat.y, objectToEat.w, objectToEat.h)) {
                objectToEat = null;
                score++;
            }
        }
    }
}

function changeTime() {
    i = (i + 1) % idleArray.length;
}

function countDown() {
    myClock--;
    if (myClock < 0) {
        myClock = 10;
        createANewFoodItem();
    }
}

function createANewFoodItem() {
    objectToEat = new myFood("images/orchid.png", random(50, width - 100), random(50, height - 100), 100, 100);
}
function yourDead(){
displayDeadArray;
}

function displayGameOver() {
    textSize(50);
    fill(225, 33, 184 );
    text("Game Over", 250, 200);
    textSize(30);
    text("Final Score: " + score, 300, 250);
}
}
