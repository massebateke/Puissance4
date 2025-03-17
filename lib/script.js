"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Puissance4 = /*#__PURE__*/function () {
  function Puissance4() {
    _classCallCheck(this, Puissance4);
    this.boardElement = document.querySelector(".board");
    this.statusElement = document.querySelector(".status");
    this.winnerElement = document.querySelector(".winner");
    this.resetBtn = document.getElementById("reset-btn");
    this.undoBtn = document.getElementById("back");
    this.startBtn = document.getElementById("start-game");
    this.colonneInput = document.getElementById("cols");
    this.ligneInput = document.getElementById("rows");
    this.rows = 6;
    this.cols = 7;
    this.gameBoard = [];
    this.currentPlayer = "red";
    this.isGameOver = false;
    this.moveHistory = [];
    this.bindEvents();
  }
  return _createClass(Puissance4, [{
    key: "bindEvents",
    value: function bindEvents() {
      var _this = this;
      this.startBtn.addEventListener("click", function () {
        return _this.startGame();
      });
      this.resetBtn.addEventListener("click", function () {
        return _this.resetGame();
      });
      this.boardElement.addEventListener("click", function (e) {
        return _this.handleCellClick(e);
      });
      this.undoBtn.addEventListener("click", function () {
        return _this.undoMove();
      });
    }
  }, {
    key: "startGame",
    value: function startGame() {
      var cols = parseInt(this.colonneInput.value);
      var rows = parseInt(this.ligneInput.value);
      if (cols >= 4 && rows >= 4) {
        this.cols = cols;
        this.rows = rows;
      }
      this.grilleSet();
      document.querySelector(".grid-settings").style.display = "none";
    }
  }, {
    key: "resetGame",
    value: function resetGame() {
      this.grilleSet();
      this.winnerElement.innerText = "";
      this.isGameOver = false;
    }
  }, {
    key: "grilleSet",
    value: function grilleSet() {
      var _this2 = this;
      this.gameBoard = Array.from({
        length: this.rows
      }, function () {
        return Array(_this2.cols).fill(null);
      });
      this.boardElement.innerHTML = "";
      this.isGameOver = false;
      this.moveHistory = [];
      this.boardElement.style.gridTemplateColumns = "repeat(".concat(this.cols, ", 50px)");
      this.boardElement.style.gridTemplateRows = "repeat(".concat(this.rows, ", 50px)");
      for (var r = 0; r < this.rows; r++) {
        for (var c = 0; c < this.cols; c++) {
          var disc = document.createElement("div");
          disc.classList.add("cell");
          disc.setAttribute("data-col", c);
          disc.setAttribute("data-row", r);
          this.boardElement.appendChild(disc);
        }
      }
      this.jouerActuel();
    }
  }, {
    key: "handleCellClick",
    value: function handleCellClick(e) {
      if (!this.isGameOver && e.target.classList.contains("cell")) {
        var col = parseInt(e.target.getAttribute("data-col"));
        for (var row = this.rows - 1; row >= 0; row--) {
          var clickedCell = this.boardElement.querySelector("[data-row=\"".concat(row, "\"][data-col=\"").concat(col, "\"]"));
          if (!clickedCell.classList.contains("red") && !clickedCell.classList.contains("yellow")) {
            clickedCell.classList.add(this.currentPlayer);
            this.gameBoard[row][col] = this.currentPlayer;
            this.moveHistory.push({
              row: row,
              col: col,
              playerColor: this.currentPlayer
            });
            clickedCell.classList.add('fall');
            if (this.winCheck()) {
              this.winnerElement.innerText = "".concat(this.currentPlayer.toUpperCase(), " wins!");
              this.isGameOver = true;
              return;
            }
            this.currentPlayer = this.currentPlayer === "red" ? "yellow" : "red";
            this.jouerActuel();
            break;
          }
        }
      }
    }
  }, {
    key: "winCheck",
    value: function winCheck() {
      for (var r = 0; r < this.rows; r++) {
        for (var c = 0; c <= this.cols - 4; c++) {
          var player = this.gameBoard[r][c];
          if (player && player === this.gameBoard[r][c + 1] && player === this.gameBoard[r][c + 2] && player === this.gameBoard[r][c + 3]) {
            return true;
          }
        }
      }
      for (var _c = 0; _c < this.cols; _c++) {
        for (var _r = 0; _r <= this.rows - 4; _r++) {
          var _player = this.gameBoard[_r][_c];
          if (_player && _player === this.gameBoard[_r + 1][_c] && _player === this.gameBoard[_r + 2][_c] && _player === this.gameBoard[_r + 3][_c]) {
            return true;
          }
        }
      }
      for (var _r2 = 0; _r2 <= this.rows - 4; _r2++) {
        for (var _c2 = 0; _c2 <= this.cols - 4; _c2++) {
          var _player2 = this.gameBoard[_r2][_c2];
          if (_player2 && _player2 === this.gameBoard[_r2 + 1][_c2 + 1] && _player2 === this.gameBoard[_r2 + 2][_c2 + 2] && _player2 === this.gameBoard[_r2 + 3][_c2 + 3]) {
            return true;
          }
        }
      }
      for (var _r3 = 3; _r3 < this.rows; _r3++) {
        for (var _c3 = 0; _c3 <= this.cols - 4; _c3++) {
          var _player3 = this.gameBoard[_r3][_c3];
          if (_player3 && _player3 === this.gameBoard[_r3 - 1][_c3 + 1] && _player3 === this.gameBoard[_r3 - 2][_c3 + 2] && _player3 === this.gameBoard[_r3 - 3][_c3 + 3]) {
            return true;
          }
        }
      }
      return false;
    }
  }, {
    key: "jouerActuel",
    value: function jouerActuel() {
      var currentPlayerDisplay = document.getElementById("currentPlayerDisplay");
      currentPlayerDisplay.innerText = "Au tour du joueur: ".concat(this.currentPlayer.charAt(0).toUpperCase() + this.currentPlayer.slice(1));
    }
  }, {
    key: "undoMove",
    value: function undoMove() {
      if (this.moveHistory.length > 0) {
        var lastMove = this.moveHistory.pop();
        var row = lastMove.row,
          col = lastMove.col,
          playerColor = lastMove.playerColor;
        var cell = this.boardElement.querySelector("[data-row=\"".concat(row, "\"][data-col=\"").concat(col, "\"]"));
        cell.classList.remove(playerColor);
        this.gameBoard[row][col] = null;
        this.currentPlayer = this.currentPlayer === 'red' ? 'yellow' : 'red';
        this.jouerActuel();
      }
    }
  }]);
}();
document.addEventListener("DOMContentLoaded", function () {
  new Puissance4();
});