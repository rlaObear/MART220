
var idlePaths = [];
var myAnimation;
var myWalkAnimation;
var walkPaths = [];
let catImage;
let brainImage;
function preload() {
   idlePaths = loadStrings("./images/idle/idle.txt");
   walkPaths = loadStrings("./images/walk/walk.txt");
   
}

function setup() {
  createCanvas(800,600);
  myAnimation = new animationImage( 200, 200, 150, 150);
  myAnimation.myLoadAnimation('idle', idlePaths);
  myAnimation.myLoadAnimation('walk', walkPaths);
  

  //compact way to add an image
  catImage = new Sprite(450, 200,100,100, 'static');
  catImage.img = "./images/cat.jpg";
  catImage.scale = 0.05;
  catImage.diameter = 100;


  //compact way to add an image
  brainImage = new Sprite(250, 400,100,100, 'static');
  brainImage.img = "./images/brain.jpeg";
  brainImage.scale = 0.05;
  brainImage.diameter = 50;

}

// display all the frames using the draw function as a loop
function draw() 
{

    background(120);  
    
    if(kb.pressing('d'))
    {
        if(myAnimation.isColliding(catImage))
        {
            myAnimation.drawAnimation('idle');
            myAnimation.updatePosition('idle');
            
        }  
        else if(myAnimation.isColliding(brainImage))
        {
            brainImage.remove();
            
        }  
        myAnimation.updatePosition('forward');
        myAnimation.drawAnimation('walk');    
          
    }
    else if(kb.pressing('a'))
    {
        if(myAnimation.isColliding(catImage))
        {
            myAnimation.drawAnimation('idle');
            myAnimation.updatePosition('idle');  
        }  
        myAnimation.updatePosition('reverse');
        myAnimation.drawAnimation('walk');        
    }
    else if(kb.pressing('w'))
    {
        if(myAnimation.isColliding(catImage))
        {
            myAnimation.drawAnimation('idle');
            myAnimation.updatePosition('idle');
            
        }  
        myAnimation.updatePosition('up');
        myAnimation.drawAnimation('walk'); 

    }
    else if(kb.pressing('s'))
    {
        if(myAnimation.isColliding(catImage))
        {
            myAnimation.drawAnimation('idle');
            myAnimation.updatePosition('idle');
            
        }  
        myAnimation.updatePosition('down');   
        myAnimation.drawAnimation('walk');        
    }
    else
    {
        myAnimation.drawAnimation('idle');
    } 
    
    brainImage.debug = mouseIsPressed;

}