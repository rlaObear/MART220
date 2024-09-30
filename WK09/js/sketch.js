var attackPaths = [];
var climbPaths = [];
var deadPaths = [];
var idlePaths = [];
var walkPaths = [];
var particles = [];
var collectables = [];
var BadCollectables = [];
var orchidImage,thunderImage, clickImage;
var treeImage1,treeImage2,treeImage3;
var daggerImage, starImage, knifeImage;
var walkingBombImage, floatingBombImage, batBombImage;
var myAnimation;
var myFont;
var health = 100;
var timerValue = 60;
var score = 0;
var backgroundSound;
var runningfeetSound;
var gameOver = false;
var resetGame;
var currentGoodCollectable;
var currentBadCollectable;

function preload() {
    //Sprite Images
    attackPaths = loadStrings("./images/attack/attack.txt");
    climbPaths = loadStrings("./images/climb/climb.txt");
    deadPaths = loadStrings("./images/dead/dead.txt");
    idlePaths = loadStrings("./images/idle/idle.txt");
    walkPaths = loadStrings("./images/walk/walk.txt");
    //Colletable Images
    daggerImage = loadImage("./images/dagger.png");
    starImage = loadImage("./images/star.png");
    knifeImage = loadImage("./images/knife.png");
    //badColletable Images
    floatingBombImage = loadImage("./images/floatingBomb.png");
    walkingBombImage = loadImage("./images/walkingBomb.png");
    batBombImage = loadImage("./images/batBomb.png");
    //Sounds
    backgroundSound = loadSound("../sound/background.mp3");
    biteSound = loadSound("../sound/bitesound.wav");
    runningfeetSound = loadSound("../sound/runningfeet.wav");
    //Font
    myFont = loadFont("fonts/ProtestRiot-Regular.ttf");
}
function timeIt() {
    if (timerValue > 0) {
        timerValue--;
    } else {
        timerValue = 0;
    }
}

function setup() {
    createCanvas(900, 700);
    textAlign(CENTER);
    setInterval(timeIt, 1000);

    //Collectables in random positions
    collectables.push(new Collectable(random(50, width -50), random(50, height -50), 100, 100, daggerImage));
    collectables.push(new Collectable(random(50, width -50), random(50, height -50), 100, 100, starImage));
    collectables.push(new Collectable(random(50, width -50), random(50, height -50), 100, 100, knifeImage));
    //BadCollectables in random positions
    BadCollectables.push(new BadCollectable(random(50, width -50), random(50, height -50), 100, 100, walkingBombImage));
    BadCollectables.push(new BadCollectable(random(50, width -50), random(50, height -50), 100, 100, floatingBombImage));
    BadCollectables.push(new BadCollectable(random(50, width -50), random(50, height -50), 100, 100, batBombImage));
   
    //Sprite movement Images
    myAnimation = new animationImage(200, 200, 150, 150);
    myAnimation.loadAnimation('attack', attackPaths);
    myAnimation.loadAnimation('climb', climbPaths);
    myAnimation.loadAnimation('dead', deadPaths);
    myAnimation.loadAnimation('idle', idlePaths);
    myAnimation.loadAnimation('walk', walkPaths);

    //Charactors for attack in random positions
    orchidImage = createSprite(random(50, width -50), random(50, height -50), 100, 100,'static');
    orchidImage.addImage(loadImage("./images/orchid.jpg"));
    orchidImage.scale = 0.50;
    thunderImage = createSprite(random(50, width -50), random(50, height -50), 100, 100,'static');
    thunderImage.addImage(loadImage("./images/thunder.jpg"));
    thunderImage.scale = 0.50;
    clickImage = createSprite(random(50, width -50), random(50, height -50), 100, 100,'static');
    clickImage.addImage(loadImage("./images/click.jpg"));
    clickImage.scale = 0.50;
   
    //immovable objects
    treeImage1 = createSprite(590, 170, 200, 200, 'static');
    treeImage1.img = "./images/tree.png";
    treeImage1.scale = 0.95;
    treeImage2 = createSprite(200, 400,200, 200, 'static');
    treeImage2.img = "./images/tree.png";
    treeImage2.scale = 0.95;
    treeImage3 = createSprite(800, 580,200, 200, 'static');
    treeImage3.img = "./images/tree.png";
    treeImage3.scale = 0.95;   
}

function draw() {
    background(164, 190, 255);
    textSize(25);
    textFont(myFont);
    fill(36, 250, 100);
    text("Created By: Obear", 770, 690)
    text("Nija Madness", 100, 690)
    text("Score: " + score, 800, 50);
    text("Health: " + health, 100, 50);
    //are these in the right place?
    handleAnimation();
    handleParticles();
    //Displays time correctly i.e. 0:00
    if (timerValue >= 10) {
        text("0:" + timerValue, width / 2, height / 2);
    }
    if (timerValue < 10) {
        text('0:0' + timerValue, width / 2, height / 2);
    }
    //I get an error code "handle animation funtion" if I combine these with the timerValue.
    //if (gameOver || timerValue == 0) {
    //Timer, Health, and Game Over handeling.
    if (gameOver) {
        // Displays game over screen
        fill(255, 0, 0);
        textSize(50);
        text("Game Over", width / 2, height / 2 - 15);
        textSize(25);
        text("Press R to Restart", width / 2, height / 2 + 30);
        return; // Stop further execution in draw
    }
        // Win condition
        if (score >= 10) {
            fill(255, 0, 0); // Green text
            textSize(50);
            text("YOU WIN", width / 2, height / 2);
            textSize(25);
            text("Press R to Restart", width / 2, height / 2 + 30);
            return; 
        }
    if (timerValue == 0) {
        text('game over', width / 2, height / 2 + 15);
        gameOver = true; // Set game over
        }

    //Can I combine these somehow as they do the same thing? For less coding.
    //Handles collectable and BadCollectable draw and collision, Score and Health tracking.
    for (let i = collectables.length - 1; i >= 0; i--) {
        let collectable = collectables[i];
        collectable.draw(); // continues to draw collectable if not collected
        if (collectable.checkCollision(myAnimation.getCurrentAnimation())) {
            score += 1; //Adds a point when collectable is collected
            console.log("Score: " + score);
            currentGoodCollectable=collectables.splice(i, 1); 
            createNewCollectible();// how do I set a timer so I can have these reappear in 3 seconds, not immeaditly?
        }
    }
    for (let i = BadCollectables.length - 1; i >= 0; i--) {
        let BadCollectable = BadCollectables[i];
        if (BadCollectable.checkCollision(myAnimation.getCurrentAnimation())) {
            health -= 30; // Reduce health when a bad collectible is collected
            console.log("Health: " + health);
            currentBadCollectable=collectables.splice(i, 1); 
            createNewBadCollectible();// how do I set a timer so I can have these reappear in 3 seconds, not immeaditly?
        }
        }
        if (health <= 0) {
        gameOver = true; // Set game over state
        }

    function resetGame() {
        // Reset game variables
        score = 0;
        health = 100;
        timerValue = 60;
        gameOver = false;
        clear();
        
        // Clear and respawn collectables and bad collectables
        collectables = [];
        BadCollectables = [];
        
        for (let i = 0; i < 3; i++) {
            createNewCollectible();
            createNewBadCollectible();
        } 
        console.log("Game has been reset!");
    }
    
    //Charactor movement and checking with collision of badcollectable items
    function handleAnimation() {
        if (keyIsPressed && key === 'r') {
            resetGame();
        }
        if (kb.pressing('d')) {
            myAnimation.updatePosition('forward');
            // function checks for collectibles collision
            if (!handleCollision(orchidImage) 
            && !handleCollision(thunderImage) 
            && !handleCollision(clickImage) 
            && !handleCollision(treeImage1) 
            && !handleCollision(treeImage2) 
            && !handleCollision(treeImage3)) 
            {
                myAnimation.drawAnimation('walk');
            }
        } 
        else if (kb.pressing('a')) {
            myAnimation.updatePosition('reverse');
            // function checks for collectibles collision
            if (!handleCollision(orchidImage) 
            && !handleCollision(thunderImage) 
            && !handleCollision(clickImage) 
            && !handleCollision(treeImage1) 
            && !handleCollision(treeImage2) 
            && !handleCollision(treeImage3)) 
            {
            myAnimation.drawAnimation('walk');
            }
        } 
        else if (kb.pressing('w')) { 
            myAnimation.updatePosition('climb');
            myAnimation.drawAnimation('climb');
        }
         else if (kb.pressing('s')) { 
            myAnimation.updatePosition('climb');
            myAnimation.drawAnimation('climb');
        } 
        else if (kb.pressing('x')) {
            myAnimation.drawAnimation('attack');
            handleAttack(orchidImage);
            handleAttack(thunderImage);
            handleAttack(clickImage);
        } 
        else 
            {
            myAnimation.drawAnimation('idle');
            }
        } 

    function handleCollision(sprite) {
        if (sprite != null && myAnimation.isColliding(sprite)) 
        {
            myAnimation.updatePosition('idle');
            myAnimation.drawAnimation('idle');
            return true;
        }
        return false;
    }
    
    function handleAttack(sprite) 
    {
        if (sprite != null) 
        { let distance = dist(myAnimation.getCurrentAnimation().position.x, 
            myAnimation.getCurrentAnimation().position.y, 
            sprite.position.x, sprite.position.y);
        if (distance < 200) 
        {createParticles(sprite.position.x, sprite.position.y);
            health -= 1;
        if (health <= 0) 
        {
            sprite.remove();
            sprite = null;
        }}}
    }
    
    function createParticles(x, y) 
    {
        for (let i = 0; i < 5; i++)
        { let p = new Particle(x, y);
          particles.push(p);}
    }
    
    function handleParticles() 
    {
        for (let i = particles.length - 1; i >= 0; i--) 
        { particles[i].update();
          particles[i].show();
          if (particles[i].finished()) 
        {particles.splice(i, 1);}}
    } 
    
    function resetGame() {
        // Reset game variables
        score = 0;
        health = 100;
        timerValue = 60;
        gameOver = false;
    
        // Clear the collectables and BadCollectables arrays
        collectables = [];  // This will remove all elements from the array
        BadCollectables = [];  // Clear bad collectables array
    
        // Repopulate the arrays with new items
        createNewCollectible();
        createNewBadCollectible();
    
        // Reset player position
        myAnimation.currentAnimation.position.x = 200;
        myAnimation.currentAnimation.position.y = 200;
    
        console.log("Game reset! Collectables and BadCollectables cleared and repopulated.");
    }
    
    
    function createNewCollectible(){
        collectables.push(new Collectable(random(0, width), random(0, height), 100, 100,currentGoodCollectable[0].getImage()));
        //collectables.push(new Collectable(random(0, width), random(0, height), 100, 100, daggerImage));
       // collectables.push(new Collectable(random(0, width), random(0, height), 100, 100, starImage));
        //collectables.push(new Collectable(random(0, width), random(0, height), 100, 100, knifeImage));
    }
    //function createNewBadCollectible(){
        //collectables.push(new Collectable(random(0, width), random(0, height), 100, 100,currentBadCollectable[0].getImage()));
        //BadCollectables.push(new BadCollectable(random(0, width), random(0, height), 100, 100, walkingBombImage));
        //BadCollectables.push(new BadCollectable(random(0, width), random(0, height), 100, 100, floatingBombImage));
        //BadCollectables.push(new BadCollectable(random(0, width), random(0, height), 100, 100, batBombImage));
    }
