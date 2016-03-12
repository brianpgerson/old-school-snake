var Snake = require('./snake.js');


function Board() {
  this.changes = [];
  this.snake = new Snake(this.randomPosition(), this);
  this.apple = this.randomPosition();
  this.score = 0;
}

Board.prototype.ROWS = 20;
Board.prototype.COLS = 20;

Board.prototype.randomPosition = function () {
  var row = Math.floor(
    Math.random() * (this.ROWS)
  );
  var col = Math.floor(
    Math.random() * (this.COLS)
  );

  return [row, col];
};

Board.prototype.moveApple = function () {
  this.apple = this.randomPosition();
};

Board.prototype.reset = function () {
  this.snake = new Snake(this.randomPosition(), this);
  this.apple = this.randomPosition();
  this.score = 0;
};

Board.prototype.snakeDead = function () {
  var pos = this.snake.segments[0];

  if (pos[0] >= this.ROWS || pos[0] < 0 || pos[1] >= this.COLS || pos[1] < 0 ) {
    return true;
  } else if (this.snake.segments.slice(1).some(function(el) {
    return (el[0] === pos[0] && el[1] === pos[1]);
  })) {
    return true;
  } else {
    return false;
  }
};

module.exports = Board;
