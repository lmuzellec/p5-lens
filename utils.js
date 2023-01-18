/**
 * @param {{x: number, y: number}} from
 * @param {{x: number, y: number}} to
 * @returns {boolean}
 */
function distance(from, to) {
  return sqrt((from.x - to.x) ** 2 + (from.y - to.y) ** 2);
}

/**
 *
 * @param {{x: number, y: number}} point
 * @param {{x: number, y: number}} origin
 * @param {number} rotation
 * @returns {{x: number, y: number}}
 */
function coordinateAfterRotationAroundOrigin(point, origin, rotation) {
  return {
    x:
      (point.x - origin.x) * cos(rotation) -
      (point.y - origin.y) * sin(rotation),
    y:
      (point.x - origin.x) * sin(rotation) +
      (point.y - origin.y) * cos(rotation),
  };
}
