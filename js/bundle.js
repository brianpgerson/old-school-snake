/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(1);
	var View = __webpack_require__(4);
	
	$(function () {
	
	  var $el = $('.snake-board');
	  var board = new Board();
	
	  new View(board, $el);
	
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Snake = __webpack_require__(2);
	
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	
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


/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map