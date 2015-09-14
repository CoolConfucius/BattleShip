$(document).ready(init);
function init() {
  $state.text(state);
  $('button').click(buttonClick); 
  $('#yours').on('click', '.tile', (yoursClick));
  $('#theirs').on('click', '.tile', (theirsClick));
};

var grid1 = [[], [], [], [], [], [], [], [], [], []];
for (var i = 0; i < grid1.length; i++) {
  for (var j = 0; j < 10; j++) {
    grid1[i].push('O');    
  };
};

var grid2 = [[], [], [], [], [], [], [], [], [], []];
for (var i = 0; i < grid2.length; i++) {
  for (var j = 0; j < 10; j++) {
    grid2[i].push('U');    
  };
};

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
        var $buttonShip = $('button.ship')
        for(var i=0; i<$buttonShip.length; i++){
          $buttonShip[i].disabled = true; 
        }
        document.getElementById('rotate').disabled = true;
        $vert.text('');
        state = "select target"; 
      $state.text(state);
    } else {
      state = "select ship"; 
      $state.text(state);
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
    // for predictable opponent
    switch(i){
      case 0:
        size = 2; 
        row = Math.floor((Math.random() * 2)); 
        col = Math.floor((Math.random() * 2)); 
        vertical = false;
        break;  
      case 1:
        size = 3; 
        row = Math.floor((Math.random() * 3)) + 3; 
        col = Math.floor((Math.random() * 4)) + 3; 
        vertical = true;
        break; 
      case 2:
        size = 3; 
        row = Math.floor((Math.random() * 3)); 
        col = Math.floor((Math.random() * 2)) + 4; 
        vertical = false;
        break; 
      case 3:
        size = 4; 
        row = Math.floor((Math.random() * 2)) + 4; 
        col = Math.floor((Math.random() * 2)) + 1; 
        vertical = true;
      break; 
      default:
        size = 5; 
        row = Math.floor((Math.random())) + 8; 
        col = Math.floor((Math.random() * 4)) + 2; 
        vertical = false;
    }
    // for random opponent 
    // vertical = Math.round((Math.random()));    
    // if (i === 0 || i === 1) { 
    //   size = i + 2; 
    //   row = Math.floor((Math.random() * 9));
    //   col = Math.floor((Math.random() * 9)); 
    // } else { 
    //   size = i + 1; 
    // }
    // while (validPlacement(grid2, row, col, size, vertical) === false){
    //   row = Math.floor((Math.random() * 9));
    //   col = Math.floor((Math.random() * 9));  
    // }
    placeShip('player2', grid2, row, col, size, vertical); 
  };
};


function attackAI(){
  var row = Math.floor((Math.random() * 10)); 
  var col = Math.floor((Math.random() * 10)); 
  while (grid1[row][col] === "M" || grid1[row][col] === "H"){
    row = Math.floor((Math.random() * 10));
    col = Math.floor((Math.random() * 10));  
  } 
  if (grid1[row][col] === "S") {
    grid1[row][col] = "H";
    $('#box'+row+col).text("H");
    $('#box'+row+col).addClass("hit");
    hits1 += 1; 
  } else {
    grid1[row][col] = "M";
    $('#box'+row+col).text("M");
    $('#box'+row+col).addClass("miss");
  }
  if (hits1 === 17) {
    $('#win').text("You lost all your battle ships!");
  };
};

function buttonClick(){
  var $this = $(this);
  if ($this.hasClass('join')) {
    if (state === "click join") {
      placeShipAI(grid2); 
      state = "select ship";
      $state.text(state);
    };
  };
  if($this.hasClass('ship')){
    if (state === "select ship") {
      size = parseInt($this.text());
      shipId = $this[0].id;
      state = "place ship";
      $state.text(state);
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

function hitOpponent(){
  console.log(row, col);
  if (grid2[row][col] !== "M" && grid2[row][col] !== "H") {                
    if (grid2[row][col] === "S") {
      grid2[row][col] = "H";
      $('#bx'+row+col).text("H");
      $('#bx'+row+col).addClass("hit");
      hits2 += 1;
      if (hits2 === 17) {
        $('#win').text("You sunk all their battleships!");
      };
    } else {
      grid2[row][col] = "M";
      $('#bx'+row+col).text("M");
      $('#bx'+row+col).addClass("miss");
    }             
    attackAI();
  }
}