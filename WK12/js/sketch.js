let img;
let img2;
let myFont;

function preload() {
    myFont = loadFont('fonts/ProtestRiot-Regular.ttf');
}

function setup() {
    createCanvas(700, 700, WEBGL)
    img = loadImage('assets/orchid.png');
    img2 = loadImage('assets/thunder.png');
    textFont(myFont);


}

function draw() {
    background(208, 249, 247);

    fill(155,150,290);
    textSize(32);
    text("3D Shapes in Coding!", -0, 0, 0);
    text("By: O'Bear", 0, 200, 100);


    push();
    translate(200, 0, 0)
    rotateX(8);
    rotateY(8);
    rotateZ(8);
    pop();
  

    push();
    translate(100,-100,-200);
    //normalMaterial(); Cone has a solid fill
    rotateX(frameCount * .01);
    rotateY(frameCount * 0.01);
    fill(250, 0, 0);
    cone(40, 100, 100);
    pop();

    push();
    translate(-100,-200,-300);
    normalMaterial();
    rotateX(frameCount * .01);
    rotateY(frameCount * 0.01);
    ellipsoid(30, 40, 40);
    pop();
    
    push();
    translate(205, 102, 94);
    normalMaterial();
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    torus(30, 15);
    pop();
    
    push();
    translate(-125, 100, 94);
    rotateX(frameCount * 0.01);
    rotateZ(frameCount * 0.01);
    fill(65, 204, 250);
    cylinder(20, 50);
    pop();
   
    push();
    translate(150, -200, 100); 
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    texture(img);
    box(50);
    pop();

    push();
    translate(-120, -200, 94);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    texture(img2);
    box(50);
    pop();
}
