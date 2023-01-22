class ZoomLens extends LensWithHandle {
  constructor(inputGraphic, outputGraphic) {
    super(outputGraphic, 150, 400);
    this.zoom = 0.7;

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
      this.x - this.size * this.zoom,
      this.y - this.size * this.zoom,
      this.size * 2 * this.zoom,
      this.size * 2 * this.zoom,
      this.x - this.size,
      this.y - this.size,
      this.size * 2,
      this.size * 2
    );

    this.imageNormal = this.pgMask(this.inputGraphic, this.outerMask, false);
    this.imageZoomed = this.pgMask(this.zoomedGraphic, this.innerMask, false);
  }

  draw() {
    this.outputGraphic.image(this.imageNormal, 0, 0);
    this.outputGraphic.image(this.imageZoomed, 0, 0);
    super.draw();
  }

  /**
   * @param {number} zoom
   */
  updateZoom(zoom) {
    this.zoom = min(1, max(0.3, this.zoom + (0.01 * zoom) / abs(zoom)));
  }
}
