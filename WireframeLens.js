class WireframeLens extends Lens {
  constructor(inputSolid, inputWireframe, outputGraphic) {
    super(outputGraphic, 150, 150);

    this.inputSolid = inputSolid;
    this.inputWireframe = inputWireframe;
    this.imageWireframe = createImage(SIZE.width, SIZE.height);
    this.imageSolid = createImage(SIZE.width, SIZE.height);
  }

  update() {
    super.update();

    this.updateOutput();
  }

  draw() {
    this.outputGraphic.image(this.imageWireframe, 0, 0);
    this.outputGraphic.image(this.imageSolid, 0, 0);
    super.draw();
  }

  updateOutput() {
    this.imageWireframe = this.pgMask(
      this.inputWireframe,
      this.innerMask,
      true
    );
    this.imageSolid = this.pgMask(this.inputSolid, this.outerMask, true);
  }
}
