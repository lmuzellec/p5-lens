class LensWithHandle extends Lens {
  constructor(
    outputGraphic,
    x = 150,
    y = 150,
    size = 70,
    edgeSize = 10,
    handleOffset = 0,
    handleSize = {
      width: 60,
      height: 20,
    }
  ) {
    super(outputGraphic, x, y, size, edgeSize);
    this.handleOffset = handleOffset - PI / 4;
    this.handlePosition = {
      x: this.x + sqrt(2) * this.size * cos(this.handleOffset),
      y: this.y + sqrt(2) * this.size * -sin(this.handleOffset),
    };
    this.handleSize = handleSize;
  }

  /**
   * @returns {boolean}
   */
  isOver() {
    let overLens = super.isOver();
    // Is mouse over handle

    let mouseRotated = coordinateAfterRotationAroundOrigin(
      {
        x: mouseX,
        y: mouseY,
      },
      this.handlePosition,
      this.handleOffset
    );

    if (
      mouseRotated.x > this.edgeSize - this.handleSize.width / 2 &&
      mouseRotated.x < this.edgeSize + this.handleSize.width / 2 &&
      mouseRotated.y > -this.handleSize.height / 2 &&
      mouseRotated.y < this.handleSize.height / 2
    ) {
      return true;
    }

    return overLens;
  }

  update() {
    super.update();

    this.handlePosition = {
      x: this.x + sqrt(2) * this.size * cos(this.handleOffset),
      y: this.y + sqrt(2) * this.size * -sin(this.handleOffset),
    };
  }

  draw() {
    super.draw();

    this.outputGraphic.push();

    if (this.dragging) {
      this.outputGraphic.fill(0, 255, 0);
    } else if (this.hovering) {
      this.outputGraphic.fill(255, 255, 0);
    } else {
      this.outputGraphic.fill(200, 200, 200);
    }

    this.outputGraphic.noStroke();
    this.outputGraphic.translate(this.handlePosition.x, this.handlePosition.y);
    this.outputGraphic.rotate(-this.handleOffset);
    this.outputGraphic.rect(
      this.edgeSize - this.handleSize.width / 2,
      -this.handleSize.height / 2,
      this.handleSize.width,
      this.handleSize.height
    );

    this.outputGraphic.pop();
  }
}
