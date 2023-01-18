class Lens extends Draggable {
  constructor(outputGraphic, x = 150, y = 150, size = 70, edgeSize = 10) {
    super(x, y);
    this.outputGraphic = outputGraphic;
    this.x = x;
    this.y = y;

    this.innerMask = createGraphics(SIZE.width, SIZE.height);
    this.outerMask = createGraphics(SIZE.width, SIZE.height);

    // radius
    this.size = size;
    this.edgeSize = edgeSize;
  }

  /**
   * @returns {boolean}
   */
  isOver() {
    // Is mouse over lens
    let outside = distance({ x: mouseX, y: mouseY }, this) > this.size;
    let inside =
      distance({ x: mouseX, y: mouseY }, this) < this.size + this.edgeSize;
    if (outside && inside) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    super.update();
    this.updateMask();
  }

  draw() {
    this.outputGraphic.push();
    if (this.dragging) {
      this.outputGraphic.stroke(0, 255, 0);
    } else if (this.hovering) {
      this.outputGraphic.stroke(255, 255, 0);
    } else {
      this.outputGraphic.stroke(200, 200, 200);
    }
    this.outputGraphic.strokeWeight(this.edgeSize);
    this.outputGraphic.noFill();
    // diameter
    this.outputGraphic.circle(this.x, this.y, this.size * 2 + this.edgeSize);
    this.outputGraphic.pop();
  }

  updateMask() {
    this.innerMask.background(0);
    this.innerMask.fill(255);
    this.innerMask.circle(this.x, this.y, this.size * 2 + this.edgeSize);
    // this.innerMask.circle(mouseX, mouseY, 200);
    this.outerMask.background(255);
    this.outerMask.fill(0);
    this.outerMask.circle(this.x, this.y, this.size * 2 + this.edgeSize);
    // this.outerMask.circle(mouseX, mouseY, 200);
  }

  pgMask(content, mask, contentIsWebGL = false) {
    //Create the mask as image
    var img = createImage(mask.width, mask.height);
    img.copy(
      mask,
      0,
      0,
      mask.width,
      mask.height,
      0,
      0,
      mask.width,
      mask.height
    );
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
}
