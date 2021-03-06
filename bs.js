$(document).ready(init);
function init() {
  $state.text("Click the Join button to start the game!");
  $('button').click(buttonClick); 
  $('#yours').on('click', '.tile', (yoursClick));
  $('#theirs').on('click', '.tile', (theirsClick));
};

function makeJSGrid(){
  var grid = [[], [], [], [], [], [], [], [], [], []]; 
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < 10; j++) {
      grid[i].push('O');    
    };
  };
  return grid; 
}; 
var grid1 = makeJSGrid(); 
var grid2 = makeJSGrid(); 

var row;
var col; 
var ships = [2, 3, 3, 4, 5]; 
var limit = 5; 
var state = "click join";
var size; 
var shipId; 
var shipCoords = []; 
var $state = $('#state');
var $coordR = $('#coordR');
var $coordC = $('#coordC');
var $vert = $('#vert');
var currentPlayer = "player1";
var vertical = false;
var hits1 = 0;  
var hits2 = 0;  

function validPlacement(grid, row, col, size, vertical){
  function checkTile(grid, row, col){
    if (row >= 10 || col >= 10){
      return false; 
    }
    if (grid[row][col] === "S"){
      return false; 
    }
    return true; 
  };

  if (grid[row][col] === "S"){
    return false; 
  }
  if (vertical) {
    for (var i = 1; i < size; i++) {
      if(!checkTile(grid, row + i, col))
        return false;
    }
  } else {
    for (var i = 1; i < size; i++) {      
      if(!checkTile(grid, row, col + i))
        return false;
    }
  }
  return true; 
};

function placeShip(player, grid, row, col, size, vertical){
  var box;
  if (player === "player1") {
    box = '#box';
  } else {
    box = '#bx';
  }
  function paintShip(player, box, row, col){
    if (player === 'player1') {
      $(box+row+col).text("S");
      $(box+row+col).addClass("occupied");  
    };
  };
  grid[row][col] = "S";
  paintShip(player, box, row, col);
  if (vertical) {
    for (var i = 1; i < size; i++) {      
      grid[row + i][col] = "S";
      paintShip(player, box, row+i, col);
    }
  } else {
    for (var i = 1; i < size; i++) {
      grid[row][col + i] = "S";
      paintShip(player, box, row, col+i);
    }
  }
  if (player === 'player1') {
    limit -= 1; 
    row = '';
    col = '';
    $coordR.text(row);
    $coordC.text(col);
    document.getElementById(shipId).disabled = true;
    if (limit === 0) {        
      $vert.text('');
      document.getElementById('rotate').disabled = true;
      state = "select target"; 
      $state.text("Select a target to hit!");
    } else {
      state = "select ship"; 
      $state.text("Select a ship to place on your grid");
    }  
  };
};


function placeShipAI(grid2){
  var ships = 5; 
  var row;
  var col;
  var vertical; 
  var size; 
  for (var i = 0; i < ships; i++) {
    vertical = Math.round((Math.random()));    
    if (i === 0 || i === 1) { 
      size = i + 2; 
      row = Math.floor((Math.random() * 9));
      col = Math.floor((Math.random() * 9)); 
    } else { 
      size = i + 1; 
    }
    while (validPlacement(grid2, row, col, size, vertical) === false){
      row = Math.floor((Math.random() * 9));
      col = Math.floor((Math.random() * 9));  
    }
    placeShip('player2', grid2, row, col, size, vertical); 
  };
};

function hitTile(player, grid, row, col){
  var box = (player === "player1") ? '#bx' : '#box';  
  if (grid[row][col] === "S") {
    grid[row][col] = "H";
    $(box+row+col).text("H");
    $(box+row+col).addClass("hit");
    (player === "player1") ? hits2 += 1 : hits1 += 1;  
    if (hits1 === 17) {
      $('#win').text("You lost all your battle ships!");
      state = "You lose!";
      $state.text(state);
    };
    if (hits2 === 17) {
      $('#win').text("You sunk all their battleships!");
      state = "You win!";
      $state.text(state);
    };
  } else {
    grid[row][col] = "M";
    $(box+row+col).text("M");
    $(box+row+col).addClass("miss");
  }  
};

function attackAI(){
  var row = Math.floor((Math.random() * 10)); 
  var col = Math.floor((Math.random() * 10)); 
  while (grid1[row][col] === "M" || grid1[row][col] === "H"){
    row = Math.floor((Math.random() * 10));
    col = Math.floor((Math.random() * 10));  
  } 
  hitTile('player2', grid1, row, col);
};
function hitOpponent(){
  if (grid2[row][col] !== "M" && grid2[row][col] !== "H") {                
    hitTile('player1', grid2, row, col);
    attackAI();
  }
}

function buttonClick(){
  var $this = $(this);
  if ($this.hasClass('join')) {
    if (state === "click join") {
      placeShipAI(grid2); 
      state = "select ship";
      $state.text("Select a ship to place on your grid");
    };
  };

  if ($this.hasClass('restart')) {
    $state.text("Click the Join button to start the game!");
    $('#win').text("");
    grid1 = makeJSGrid();
    grid2 = makeJSGrid();
    row = '';
    col = ''; 
    ships = [2, 3, 3, 4, 5]; 
    limit = 5; 
    state = "click join";
    size = ''; 
    shipId = ''; 
    shipCoords = []; 
    $state = $('#state');
    $coordR = $('#coordR');
    $coordC = $('#coordC');
    $vert = $('#vert');
    currentPlayer = "player1";
    vertical = false;
    hits1 = 0;  
    hits2 = 0;  


    for (var row = 0; row < 10; row++) {
      for (var col = 0; col < 10; col++) {
        $('#box'+row+col).removeClass("occupied").removeClass("hit").removeClass("miss");
        $('#box'+row+col).text("O");        
        $('#bx'+row+col).removeClass("occupied").removeClass("hit").removeClass("miss");
        $('#bx'+row+col).text("O");
      };
    };

    document.getElementById('s2').disabled = false;
    document.getElementById('s3').disabled = false;
    document.getElementById('s31').disabled = false;
    document.getElementById('s4').disabled = false;
    document.getElementById('s5').disabled = false;
    document.getElementById('rotate').disabled = false;
    
  };
  if($this.hasClass('ship')){
    if (state === "select ship") {
      size = parseInt($this.text());
      shipId = $this[0].id;
      state = "place ship";
      $state.text("Place the ship you selected on your grid");
    };
  };
  
  if($this.hasClass('rotate')){
    if (vertical) {
      vertical = false; 
      $vert.text("Horizontal");
    } else {
      vertical = true; 
      $vert.text("Vertical");
    };
  };
  
  if($this.hasClass('row')){
    if (state === "place ship" || state === "select target") {
      row = $this.data('id');
      
      $coordR.text($this.text());
    };    
  };
  
  if($this.hasClass('col')){
    if (state === "place ship" || state === "select target") {
      col = parseInt($this.text());
      $coordC.text($this.text());
    };         
  };
  
  if($this.hasClass('confirm')){
    if (state === "place ship") {
      if (validPlacement(grid1, row, col, size, vertical)) {        
        placeShip('player1', grid1, row, col, size, vertical); 
      }; 

    } else           
    if (state === "select target") {
      hitOpponent();      
    }; 
  };
}


function yoursClick(){  
  if (state === 'place ship') {
    var $this = $(this);
    var tileId = $this[0].id.split('');    
    row = parseInt(tileId[3]);
    col = parseInt(tileId[4]);
    $coordR.text(row);
    $coordC.text(col);
    if (validPlacement(grid1, row, col, size, vertical)) {        
      placeShip('player1', grid1, row, col, size, vertical); 
    }
  };
};

function theirsClick(){  
  if (state === 'select target') {
    var $this = $(this);
    var tileId = $this[0].id.split('');
    row = parseInt(tileId[2]);
    col = parseInt(tileId[3]);
    hitOpponent();
  };
};
