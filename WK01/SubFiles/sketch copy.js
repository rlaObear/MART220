function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  // Draw the pie slice
  fill(255, 204, 0); // Yellowish color for the pie
  stroke(0); // Black outline
  strokeWeight(2);
  beginShape();
  vertex(200, 200);
  arc(200, 200, 200, 200, PI, -PI/4, PIE);
  endShape(CLOSE);

  // Draw whipped cream on top
  fill(255); // White color for whipped cream
  noStroke();
  ellipse(200, 140, 120, 40);
}