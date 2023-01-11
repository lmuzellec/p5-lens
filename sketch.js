/**
 * @type {Lens}
 */
let wireframeLens;
/**
 * @type {Draggable[]}
 */
let draggables = [];

let pgWireframe;
let pgSolid;
let innerMask;
let outerMask;

function setup() {
  createCanvas(windowWidth, windowHeight);

  pgWireframe = createGraphics(windowWidth, windowHeight, WEBGL);
  pgWireframe.setAttributes({ alpha: true });
  pgWireframe.perspective();

  pgSolid = createGraphics(windowWidth, windowHeight, WEBGL);
  pgSolid.setAttributes({ alpha: true });

  innerMask = createGraphics(windowWidth, windowHeight);
  outerMask = createGraphics(windowWidth, windowHeight);

  wireframeLens = new Lens(150, 150);
  draggables.push(wireframeLens);
}

function draw() {
  // update
  wireframeLens.update();

  // draw
  background(0);
  drawMask(wireframeLens);
  draw3d();

  var wireframe = pgMask(pgWireframe, innerMask, true);
  image(wireframe, 0, 0);

  var solid = pgMask(pgSolid, outerMask, true);
  image(solid, 0, 0);

  wireframeLens.draw();
}

function drawMask(lens) {
  innerMask.background(0);
  innerMask.fill(255);
  innerMask.circle(lens.x, lens.y, lens.size * 2 + lens.edgeSize);
  // innerMask.circle(mouseX, mouseY, 200);
  outerMask.background(255);
  outerMask.fill(0);
  outerMask.circle(lens.x, lens.y, lens.size * 2 + lens.edgeSize);
  // outerMask.circle(mouseX, mouseY, 200);
}

function draw3d() {
  pgWireframe.push();
  pgWireframe.reset();
  pgWireframe.background(0);
  pgWireframe.noFill();
  pgWireframe.stroke(255);
  pgWireframe.rotateY(frameCount * 0.01);
  pgWireframe.box(100);
  pgWireframe.pop();

  pgSolid.push();
  pgSolid.reset();
  pgSolid.background(0);
  pgSolid.stroke(200);
  pgSolid.rotateY(frameCount * 0.01);
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

function pgMask(content, mask, contentIsWebGL = false) {
  //Create the mask as image
  var img = createImage(mask.width, mask.height);
  img.copy(mask, 0, 0, mask.width, mask.height, 0, 0, mask.width, mask.height);
  //load pixels
  img.loadPixels();
  for (var i = 0; i < img.pixels.length; i += 4) {
    // 0 red, 1 green, 2 blue, 3 alpha
    // Assuming that the mask image is in grayscale,
    // the red channel is used for the alpha mask.
    // the color is set to black (rgb => 0) and the
    // alpha is set according to the pixel brightness.
    var v = img.pixels[i];
    img.pixels[i] = 0;
    img.pixels[i + 1] = 0;
    img.pixels[i + 2] = 0;
    img.pixels[i + 3] = v;
  }
  img.updatePixels();

  //convert _content from pg to image
  var contentImg = createImage(content.width, content.height);
  contentImg.copy(
    content,
    contentIsWebGL ? -content.width / 2 : 0,
    contentIsWebGL ? -content.height / 2 : 0,
    content.width,
    content.height,
    0,
    0,
    content.width,
    content.height
  );
  // create the mask
  contentImg.mask(img);
  // return the masked image
  return contentImg;
}
