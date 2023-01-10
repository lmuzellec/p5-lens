/**
 * @type {Lens}
 */
let lens;
/**
 * @type {Draggable[]}
 */
let draggables = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(100);

  lens = new Lens();
  draggables.push(lens);
}

function draw() {
  // update
  lens.update();

  // draw
  background(0);
  lens.draw();
}

function mousePressed() {
  for (const draggable of draggables) {
    draggable.onPressed();
  }
}

function mouseReleased() {
  for (const draggable of draggables) {
    draggable.onReleased();
  }
}
