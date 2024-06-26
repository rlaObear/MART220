let idlePaths = [];
let walkPaths = [];
let myAnimation;
let orchidImage;
let thunderImage;

function preload() {
   idlePaths = loadStrings("./images/idle/idle.txt");
   walkPaths = loadStrings("./images/walk/walk.txt");
   // Commented out other loadStrings as they overwrite walkPaths
   // walkPaths = loadStrings("./images/dead/deadk.txt");
   // walkPaths = loadStrings("./images/run/run.txt");
   // walkPaths = loadStrings("./images/slide/slide.txt");
}

function setup() {
  createCanvas(800, 600);
  myAnimation = new AnimationImage(200, 200, 150, 150);
  myAnimation.myLoadAnimation('idle', idlePaths);
  myAnimation.myLoadAnimation('walk', walkPaths);
  
  orchidImage = new Sprite(450, 200, 100, 100, 'static');
  orchidImage.img = loadImage("./images/orchid.jpg"); // Use loadImage for loading images
  orchidImage.scale = 0.05;
  orchidImage.diameter = 100;

  thunderImage = new Sprite(250, 400, 100, 100, 'static');
  thunderImage.img = loadImage("./images/thunder.jpeg"); // Use loadImage for loading images
  thunderImage.scale = 0.05;
  thunderImage.diameter = 50;
}

function draw() {
    background(120);  
    
    if (keyIsDown(68)) { // 68 is ASCII for 'd'
        if (myAnimation.isColliding(orchidImage)) {
            myAnimation.drawAnimation('idle');
            myAnimation.updatePosition('idle');
        }  
        else if (myAnimation.isColliding(thunderImage)) {
            thunderImage.remove();
        }  
        myAnimation.updatePosition('forward');
        myAnimation.drawAnimation('walk');    
          
    } else if (keyIsDown(65)) { // 65 is ASCII for 'a'
        if (myAnimation.isColliding(orchidImage)) {
            myAnimation.drawAnimation('idle');
            myAnimation.updatePosition('idle');  
        }  
        myAnimation.updatePosition('reverse');
        myAnimation.drawAnimation('walk');        
    } else if (keyIsDown(87)) { // 87 is ASCII for 'w'
        if (myAnimation.isColliding(orchidImage)) {
            myAnimation.drawAnimation('idle');
            myAnimation.updatePosition('idle');
        }  
        myAnimation.updatePosition('up');
        myAnimation.drawAnimation('walk'); 
    } else if (keyIsDown(83)) { // 83 is ASCII for 's'
        if (myAnimation.isColliding(orchidImage)) {
            myAnimation.drawAnimation('idle');
            myAnimation.updatePosition('idle');
        }  
        myAnimation.updatePosition('down');   
        myAnimation.drawAnimation('walk');        
    } else {
        myAnimation.drawAnimation('idle');
    } 
    
    thunderImage.debug = mouseIsPressed;
}