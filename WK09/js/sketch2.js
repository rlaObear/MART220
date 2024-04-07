//Creating animations

//animations like p5 images should be stored in variables
//in order to be displayed during the draw cycle
var ghost;

//it's advisable (but not necessary) to load the images in the preload function
//of your sketch otherwise they may appear with a little delay
function preload()
{
    ghost = loadAnimation('assets/wriggle01.png', 'assets/wriggle10.png');
}

function setup()
{
    createCanvas(800, 300);
}

function draw()
{
    background(255, 255, 255);

    animation(ghost, 300, 150);
}