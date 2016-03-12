
function View(board, $el) {
  this.board = board;
  this.$el = $el;
  this.setupBoard();
  this.bindStuff();
  this.begun = false;
}

View.prototype.KEYMAP = {
  38: "N",
  37: "W",
  39: "E",
  40: "S"
};


View.prototype.setupBoard = function () {
  var $grid = $('<ul>');
  for (var i = 0; i < this.board.ROWS; i++) {
    for (var j = 0; j < this.board.COLS; j++) {
      var $square = $('<li>').addClass('square').attr('data-pos', [i, j]);
      $grid.append($square);
    }
  }
  this.$el.append($grid);
};

View.prototype.bindStuff = function () {
  $(document).on('keydown', this.handleMove.bind(this));
  $('.restart').on('click', this.reset.bind(this));
};

View.prototype.update = function () {
  var currentApple = this.board.apple;

  this.board.snake.move();

  if (this.board.snakeDead()) {
    alert("you dead dawg");
    clearInterval(this.loop);
  }

  if (currentApple !== this.board.apple) {
    this.$el.find('.appled').removeClass('appled');
    this.$el.find("[data-pos='" + this.board.apple + "']").addClass('appled');
    this.board.score += 10;
  }

  while (this.board.changes.length > 0) {
    var changePos = this.board.changes.pop().join(',');
    var $toSnake = this.$el.find("[data-pos='" + changePos + "']");
    $toSnake.toggleClass('snaked');
  }
  $(".score").text(this.board.score);
};

View.prototype.reset = function () {
  this.begun = false;
  $('li').removeClass('snaked appled');
  this.board.reset();
  var fakeKey = {keyCode: 40};
  this.handleMove(fakeKey);
};

View.prototype.play = function () {
  this.loop = setInterval(this.update.bind(this), 100);
};

View.prototype.handleMove = function (e) {
  if (this.KEYMAP[e.keyCode] !== undefined) {
    this.board.snake.turn(this.KEYMAP[e.keyCode]);
    if (!this.begun) {
      this.begun = true;
      this.$el.find("[data-pos='" + this.board.apple + "']").addClass('appled');
      this.play();
    }
  }
};

module.exports = View;
