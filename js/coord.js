function Coord(pos){
  this.pos = pos;
}

Coord.prototype.plus = function (otherPos) {
  var x = this.pos[0] + otherPos[0];
  var y = this.pos[1] + otherPos[1];
  return [x, y];
};

module.exports = Coord;
