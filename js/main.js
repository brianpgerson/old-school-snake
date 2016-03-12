var Board = require('./board.js');
var View = require('./view.js');

$(function () {

  var $el = $('.snake-board');
  var board = new Board();

  new View(board, $el);

});
