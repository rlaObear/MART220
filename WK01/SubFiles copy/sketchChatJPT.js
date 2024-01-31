function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  // Draw plate
  fill(200);
  ellipse(width / 2, height / 2 + 50, 300, 200);

  // Draw pie slice
  fill(255, 165, 79); // Color for the pie (you can adjust this)
  beginShape();
  vertex(width / 2, height / 2 + 50); // Center of the pie slice
  arc(width / 2, height / 2 + 50, 200, 150, PI / 6, 11 * PI / 6, PIE);
  endShape(CLOSE);

  // Draw whipped cream
  fill(255); // White color for whipped cream
  ellipse(width / 2 + 30, height / 2 - 20, 40, 20);
  ellipse(width / 2 - 20, height / 2 - 10, 40, 20);
  ellipse(width / 2 - 10, height / 2 + 10, 40, 20);
}