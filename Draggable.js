/**
 * Abstract class Draggable
 * @class Draggable
 */
class Draggable {
  constructor(x = 150, y = 150) {
    this.x = x;
    this.y = y;
    this.offsetX = 0;
    this.offsetY = 0;

    this.dragging = false;
    this.hovering = false;
  }

  update() {
    this.hovering = this.isOver();

    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  /**
   * @returns {boolean}
   */
  isOver() {
    throw new Error("Method 'isOver()' must be implemented.");
  }

  onPressed() {
    if (this.hovering) {
      this.dragging = true;
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  onReleased() {
    this.dragging = false;
  }
}
