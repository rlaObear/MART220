function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  // Draw plate
  fill(200);
  ellipse(width / 2, height / 2, 300, 200);

  // Draw pie
  fill(255, 165, 79); // Color for the pie (you can adjust this)
  beginShape();
  vertex(width / 2, height / 2); // Center of the pie
  for (let i = 0; i < PI; i += PI / 180) {
    let x = width / 2 + cos(i) * 150;
    let y = height / 2 + sin(i) * 100;
    vertex(x, y);
  }
  endShape(CLOSE);

  // Draw whipped cream
  fill(255); // White color for whipped cream
  beginShape();
  for (let i = 0; i < PI; i += PI / 180) {
    let x = width / 2 + cos(i) * 130;
    let y = height / 2 + sin(i) * 80;
    vertex(x, y);
  }
  endShape(CLOSE);
}