class ZoomLens extends Lens {
  constructor(inputGraphic, outputGraphic) {
    super(outputGraphic, 150, 400);
    this.zoom = 1.4;

    this.inputGraphic = inputGraphic;
    this.zoomedGraphic = createGraphics(SIZE.width, SIZE.height);

    this.imageNormal = createImage(SIZE.width, SIZE.height);
    this.imageZoomed = createImage(SIZE.width, SIZE.height);
    this.outputGraphic = outputGraphic;
  }

  update() {
    super.update();
    this.zoomedGraphic.copy(
      this.inputGraphic,
      this.x - this.size,
      this.y - this.size,
      this.size * 2,
      this.size * 2,
      this.x - this.size * this.zoom,
      this.y - this.size * this.zoom,
      this.size * 2 * this.zoom,
      this.size * 2 * this.zoom
    );

    this.imageNormal = this.pgMask(this.inputGraphic, this.outerMask, false);
    this.imageZoomed = this.pgMask(this.zoomedGraphic, this.innerMask, false);
  }

  draw() {
    this.outputGraphic.image(this.imageNormal, 0, 0);
    this.outputGraphic.image(this.imageZoomed, 0, 0);
    super.draw();
  }
}
