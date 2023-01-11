class WireframeLens extends Lens {
  constructor(inputSolid, inputWireframe, outputGraphics) {
    super(150, 150);

    this.inputSolid = inputSolid;
    this.inputWireframe = inputWireframe;
    this.imageWireframe = createImage(windowWidth, windowHeight);
    this.imageSolid = createImage(windowWidth, windowHeight);
    this.outputGraphics = outputGraphics;
  }

  update() {
    super.update();

    this.updateOutput();
  }

  draw() {
    super.draw();
  }

  updateOutput() {
    this.imageWireframe = this.pgMask(
      this.inputWireframe,
      this.innerMask,
      true
    );
    this.imageSolid = this.pgMask(this.inputSolid, this.outerMask, true);

    this.outputGraphics.image(this.imageWireframe, 0, 0);
    this.outputGraphics.image(this.imageSolid, 0, 0);
  }
}
