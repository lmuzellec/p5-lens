class Lens extends Draggable {
  constructor(size = 50, edgeSize = 10) {
    super();
    this.x = 100;
    this.y = 100;

    // radius
    this.size = size;
    this.edgeSize = edgeSize;
  }

  /**
   * @returns {boolean}
   */
  isOver() {
    // Is mouse over lens
    let outside =
      sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2) > this.size;
    let inside =
      sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2) <
      this.size + this.edgeSize;
    if (outside && inside) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    super.update();
  }

  draw() {
    push();
    if (this.dragging) {
      stroke(0, 255, 0);
    } else if (this.hovering) {
      stroke(255, 255, 0);
    } else {
      stroke(255, 255, 255);
    }
    strokeWeight(this.edgeSize);
    noFill();
    // diameter
    circle(this.x, this.y, this.size * 2 + this.edgeSize);
    pop();
  }
}
