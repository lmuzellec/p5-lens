/**
 * @type {WireframeLens}
 */
let wireframeLens;
/**
 * @type {Draggable[]}
 */
let draggables = [];

let pgWireframe;
let pgSolid;
let pgWireframeOutput;

function setup() {
  createCanvas(windowWidth, windowHeight);

  pgWireframe = createGraphics(windowWidth, windowHeight, WEBGL);
  pgWireframe.setAttributes({ alpha: true });
  pgWireframe.perspective();

  pgSolid = createGraphics(windowWidth, windowHeight, WEBGL);
  pgSolid.setAttributes({ alpha: true });

  pgWireframeOutput = createGraphics(windowWidth, windowHeight);

  wireframeLens = new WireframeLens(pgSolid, pgWireframe, pgWireframeOutput);
  draggables.push(wireframeLens);
}

function draw() {
  // update
  wireframeLens.update();

  // draw
  background(0);
  drawScene();

  image(pgWireframeOutput, 0, 0);

  wireframeLens.draw();
}

function drawScene() {
  pgWireframe.push();
  pgWireframe.reset();
  pgWireframe.background(0);
  pgWireframe.noFill();
  pgWireframe.stroke(255);
  pgWireframe.rotateY(frameCount * 0.01);
  pgWireframe.rotateX(frameCount * 0.005);
  pgWireframe.box(100);
  pgWireframe.pop();

  pgSolid.push();
  pgSolid.reset();
  pgSolid.background(0);
  pgSolid.stroke(200);
  pgSolid.rotateY(frameCount * 0.01);
  pgSolid.rotateX(frameCount * 0.005);
  pgSolid.box(100);
  pgSolid.pop();
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
