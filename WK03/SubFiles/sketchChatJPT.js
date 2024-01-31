let pizzaX, pizzaY;
let ingredients = [];
let ingredientIndex = 0;
let chefHatX, chefHatY;

function setup() {
  createCanvas(600, 400);
  pizzaX = width / 2;
  pizzaY = height / 2;
  chefHatX = random(width);
  chefHatY = random(height);
  generateIngredients();
}

function draw() {
  background(255);

  // Draw pizza base
  fill(255, 228, 196); // Light brown color for crust
  ellipse(pizzaX, pizzaY, 200, 200);

  // Draw ingredients
  for (let i = 0; i < ingredientIndex; i++) {
    let currentIngredient = ingredients[i];
    drawIngredient(currentIngredient);
  }
  // Draw chef's hat
  drawChefHat(chefHatX, chefHatY);

  // Move chef's hat randomly
  chefHatX += random(-5, 5);
  chefHatY += random(-5, 5);

  // Keep chef's hat within the canvas
  chefHatX = constrain(chefHatX, 1, width);
  chefHatY = constrain(chefHatY, 1, height);

  // Display name in the lower right-hand corner
  fill(0);
  textSize(12);
  text("Creator O'Bear", width - 80, height - 20);

  // Display piece name in the upper-left hand corner
  fill(0);
  textSize(16);
  text("Pizza with Malichi", 20, 30);
}

function drawIngredient(ingredient) {
  switch (ingredient.type) {
    case "tomato":
      drawTomato(ingredient.x, ingredient.y);
      break;
    case "mushroom":
      drawMushroom(ingredient.x, ingredient.y);
      break;
    case "pepperoni":
      drawPepperoni(ingredient.x, ingredient.y);
      break;
    case "cheese":
      drawCheese(ingredient.shapes, 255, 255, 0);
      break;
  }
}
function drawChefHat(x, y) {
  // Draw chef's hat
  fill(255); // White color for the hat
  stroke(0); // Black outline
  strokeWeight(2);
  triangle(x, y, x - 20, y + 40, x + 20, y + 40);
  rect(x - 20, y + 40, 40, 20);
}
function drawCheese(points, r, g, b) {
  fill(r, g, b);
  beginShape();
  for (let point of points) {
    vertex(point.x, point.y);
  }
  endShape(CLOSE);
}

function drawTomato(x, y) {
  // Draw tomato
  fill(255, 0, 0); // Red color for tomato
  ellipse(x, y, 30, 30);

  // Draw tomato seeds
  fill(0); // Black color for seeds
  ellipse(x - 8, y - 5, 4, 4);
  ellipse(x + 8, y + 5, 4, 4);
  ellipse(x + 5, y - 8, 4, 4);
  ellipse(x - 5, y + 8, 4, 4);
}

function drawMushroom(x, y) {
  // Draw mushroom stem
  fill(139, 69, 19); // Brown color for stem
  rect(x - 5, y, 10, 15); // Shorten the stem

  // Draw mushroom cap
  fill(255); // White color for cap
  arc(x, y, 30, 30, PI, 0);
}

function drawPepperoni(x, y) {
  // Draw pepperoni
  fill(165, 42, 42); // Dark red color for pepperoni
  ellipse(x, y, 20, 20);
}

function mousePressed() {
  if (ingredientIndex < ingredients.length) {
    let currentIngredient = ingredients[ingredientIndex];
    currentIngredient.x = mouseX;
    currentIngredient.y = mouseY;
    ingredientIndex++;
  } else {
    // Reset if all ingredients have been used
    ingredientIndex = 0;
  }
}

function generateIngredients() {
  let centerX = width / 2;
  let centerY = height / 2;

  // Tomatoes
  for (let i = 0; i < 4; i++) {
    ingredients.push({ type: "tomato", x: centerX + random(-50, 50), y: centerY + random(-50, 50) });
  }

  // Mushrooms
  for (let i = 0; i < 6; i++) {
    ingredients.push({ type: "mushroom", x: centerX + random(-50, 50), y: centerY + random(-50, 50) });
  }

  // Pepperoni
  for (let i = 0; i < 10; i++) {
    ingredients.push({ type: "pepperoni", x: centerX + random(-50, 50), y: centerY + random(-50, 50) });
  }

  // Cheese (random shapes)
  for (let i = 0; i < 15; i++) {
    ingredients.push({ type: "cheese", shapes: [] }); // Empty shapes for now, will be populated on mouse click
  }
}

function mousePressed() {
  if (ingredientIndex < ingredients.length) {
    let currentIngredient = ingredients[ingredientIndex];
    currentIngredient.x = mouseX;
    currentIngredient.y = mouseY;

    // Populate cheese shapes at the mouse position
    if (currentIngredient.type === "cheese") {
      currentIngredient.shapes = generateCheeseShapes(mouseX, mouseY);
    }

    ingredientIndex++;
  } else {
    // Reset if all ingredients have been used
    ingredientIndex = 0;
  }
}

function generateCheeseShapes(x, y) {
  let shapes = [];
  for (let j = 0; j < 5; j++) {
    let angle = map(j, 0, 5, 0, TWO_PI);
    let radius = random(5, 15);
    let pointX = x + cos(angle) * radius;
    let pointY = y + sin(angle) * radius;
    shapes.push({ x: pointX, y: pointY });
  }
  return shapes;
}