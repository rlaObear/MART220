var x_pepparoni01 = 30;
var y_pepparoni01 = 100;
var pepparoni01speed = 10;
var y_pepparoni01speed =1;

var x_pepparoni02 = 30;
var y_pepparoni02 = 100;
var pepparoni02speed = 10;
var y_pepparoni02speed =1;
// Array to store stationary pepperoni circles//
var stationaryPepperoni = [];

function setup() {
  createCanvas(400, 400);
  pepparoni01speed = random(1,11);
  pepparoni02speed = random(1,11);

  //stationary pepperoni//
  stationaryPepperoni.push({ x: 210, y: 145 });
  stationaryPepperoni.push({ x: 245, y: 175 });
}

function draw() {
  background(220);
  stroke(0);
  fill(20, 20, 247 );
// Project name//
    textSize(13);
    text ("Making Pizza w/ Malachi",10, 30);
// Author name//
    textSize(13);
    text ("Created by Obear!",270, 390);
//pizza crust outer circle//
    fill (252,215,135);
    circle(200,200,200);
//pizza sauce and center circle//
    fill (251,135,95);
    circle(200,200,175);
// Pepparoni01 movement//
  fill(252, 79, 107);
  circle(x_pepparoni01,y_pepparoni01,30,20);
  x_pepparoni01 += pepparoni01speed;
  if(x_pepparoni01 >= 390 || x_pepparoni01 <= 0)
  {
    pepparoni01speed *=-1;
  }
  if(y_pepparoni01 >= 345 || y_pepparoni01 <= 0)
  {
    y_pepparoni01speed *=-1;
  }
  x_pepparoni01 += pepparoni01speed;
  y_pepparoni01 += y_pepparoni01speed;
// Pepparoni02 movement//
  fill(252, 79, 107);
  circle(x_pepparoni02,y_pepparoni02,30,20);
  x_pepparoni02 += pepparoni02speed;
  if(x_pepparoni02 >= 390 || x_pepparoni02 <= 0)
  {
    pepparoni02speed *=-1;
  }
  if(y_pepparoni02 >= 345 || y_pepparoni02 <= 0)
  {
    y_pepparoni02speed *=-1;
  }
  x_pepparoni02 += pepparoni02speed;
  y_pepparoni02 += y_pepparoni02speed;
  // Draw stationary pepperoni
  fill(252, 79, 59);
  for (let i = 0; i < stationaryPepperoni.length; i++) {
    const pepperoni = stationaryPepperoni[i];
    circle(pepperoni.x, pepperoni.y, 25);
  }
//remaining pepparoni on pizza
   fill(252, 79, 59 )
   circle(210,145,25);
   circle(245,175,25);
   circle(180,200,25);
   circle(140,210,25);
   circle(160,145,25);
   circle(190,250,25);
   circle(240,230,25);
  //white dots in pepparoni//
   fill(251,225,222)
   circle(215,145,5);
   circle(245,180,5);
   circle(175,200,5);
   circle(140,215,5);
   circle(160,140,5);
   circle(185,245,5);
   circle(240,225,5);
}
// Function to add stationary pepperoni on mouse click
function mousePressed() {
  stationaryPepperoni.push({ x: mouseX, y: mouseY });
}
