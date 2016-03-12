
var DIRECTIONS = { "N": [-1, 0], "E": [0, 1],  "S": [1, 0],  "W": [0, -1] };

function Snake(startingPos, board){
  this.direction = undefined;
  this.segments = [startingPos];
  this.name = "Tom Cruise";
  this.board = board;
  this.board.changes.push(startingPos);
}

Snake.prototype.move = function () {
  var head = this.segments[0];
  var newHead = plus(head, DIRECTIONS[this.direction]);

  // debugger;
  if (newHead[0] === this.board.apple[0] && newHead[1] === this.board.apple[1]) {
    this.board.moveApple();
  } else {
    this.board.changes.push(this.segments.pop());
  }


  this.segments.unshift(newHead);
  this.board.changes.push(newHead);

};

Snake.prototype.turn = function (newDir) {
  this.direction = newDir;
};



function plus(head, otherPos) {
  var x = head[0] + otherPos[0];
  var y = head[1] + otherPos[1];
  return [x, y];
}

module.exports = Snake;
