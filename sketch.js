/**
 * @type {WireframeLens}
 */
let wireframeLens;
/**
 * @type {ZoomLens}
 */
let zoomLens;
/**
 * @type {Draggable[]}
 */
let draggables = [];

let SIZE = { width: 500, height: 500 };

let pgWireframe;
let pgSolid;
let pgWireframeOutput;
let pgOutput;

function setup() {
  createCanvas(SIZE.width, SIZE.height);

  pgWireframe = createGraphics(SIZE.width, SIZE.height, WEBGL);
  pgWireframe.setAttributes({ alpha: true });
  pgWireframe.perspective();

  pgSolid = createGraphics(SIZE.width, SIZE.height, WEBGL);
  pgSolid.setAttributes({ alpha: true });

  pgWireframeOutput = createGraphics(SIZE.width, SIZE.height);

  pgOutput = createGraphics(SIZE.width, SIZE.height);

  wireframeLens = new WireframeLens(pgSolid, pgWireframe, pgWireframeOutput);
  draggables.push(wireframeLens);

  zoomLens = new ZoomLens(pgWireframeOutput, pgOutput);
  draggables.push(zoomLens);
}

function draw() {
  // update
  wireframeLens.update();
  zoomLens.update();

  // draw
  background(0);
  drawScene();

  wireframeLens.draw();
  zoomLens.draw();

  image(pgOutput, 0, 0);

  if (draggables.reduce((a, b) => a || b.dragging, false)) {
    cursor("grabbing");
  } else if (draggables.reduce((a, b) => a || b.hovering, false)) {
    cursor("grab");
  } else {
    cursor("default");
  }
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
