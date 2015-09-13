$(document).ready(init);

var grid = [[], [], [], [], [], [], [], [], [], []];
for (var i = 0; i < grid.length; i++) {
  for (var j = 0; j < 10; j++) {
    grid[i].push('O');    
  };
};

var grid2 = [[], [], [], [], [], [], [], [], [], []];
for (var i = 0; i < grid2.length; i++) {
  for (var j = 0; j < 10; j++) {
    grid2[i].push('O');    
  };
};

var row;
var col; 
var ships = [2, 3, 3, 4, 5]; //17. 
var limit = 5; 
var state = "click join";
var size; 
var shipId; 
var shipCoords = []; 
var $state = $('#state');
var $coordR = $('#coordR');
var $coordC = $('#coordC');

function init() {
  $state.text(state);
  // placeShipAI();
  $('button').click(buttonClick); 
};

function placeShipAI(){
  var ships = 5; 
  var row = Math.floor((Math.random() * 10)); 
  var col = Math.floor((Math.random() * 10));  
  for (var i = 0; i < ships; i++) { 
    while (grid2[row][col] === 'S'){
      row = Math.floor((Math.random() * 10));
      col = Math.floor((Math.random() * 10));  
    }
    grid2[row][col] = 'S';
    $('#bx'+row+col).text("S");
    $('#bx'+row+col).addClass("occupied");      
  };
};

function attackAI(){
  var row = Math.floor((Math.random() * 10)); 
  var col = Math.floor((Math.random() * 10)); 
  while (grid[row][col] === "M" || grid[row][col] === "H"){
    row = Math.floor((Math.random() * 10));
    col = Math.floor((Math.random() * 10));  
  } 
  if (grid[row][col] === "S") {
    grid[row][col] = "H";
    $('#box'+row+col).text("H");
    $('#box'+row+col).addClass("hit");
  } else {
    grid[row][col] = "M";
    $('#box'+row+col).text("M");
    $('#box'+row+col).addClass("miss");
  }
};

function buttonClick(){
  var $this = $(this);
  if ($this.hasClass('join')) {
    placeShipAI(); 
    state = "select ship";
  };
  if($this.hasClass('ship')){
    if (state === "select ship") {
      size = parseInt($this.text());
      shipId = $this[0].id;
      state = "place ship";
      $state.text(state);
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
      col = $this.text();
      $coordC.text($this.text());
    };         
  };
  if($this.hasClass('confirm')){

    if (state === "place ship") {
      if (grid[row][col] !== "S") {
        grid[row][col] = "S";
        $('#box'+row+col).text("S");
        $('#box'+row+col).addClass("occupied");
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
            state = "select target"; 
          $state.text(state);
        } else {
          state = "select ship"; 
          $state.text(state);
        }
        
      }; 

    } else           
    if (state === "select target") {
      if (grid2[row][col] !== "M" || grid2[row][col] !== "H") {
        if (grid2[row][col] === "S") {
          grid2[row][col] = "H";
          $('#bx'+row+col).text("H");
          $('#bx'+row+col).addClass("hit");
        } else {
          grid2[row][col] = "M";
          $('#bx'+row+col).text("M");
          $('#bx'+row+col).addClass("miss");
        }
      }
      attackAI();     
    }; 
  };


}
