$(document).ready(init);

var grid = [
['[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] '],
['[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] '], 
['[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] '],
['[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] '],
['[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] '],
['[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] '] ];

var row;
var col; 
var ships = [2, 3, 3, 4, 5]; //17. 
var limit = 3; 
var state = "select ship";
var size; 
var shipId; 
var shipCoords = []; 
var $A = $('#rA');
var $B = $('#rB');
var $C = $('#rC');
var $D = $('#rD');
var $E = $('#rE');
var $F = $('#rF');
var $state = $('#state');
var $coordR = $('#coordR');
var $coordC = $('#coordC');
function init() {
  
  $A.text(grid[0]);
  $B.text(grid[1]);
  $C.text(grid[2]);
  $D.text(grid[3]);
  $E.text(grid[4]);
  $F.text(grid[5]);
  $state.text(state);
  
  $('button').click(buttonClick); 
};

function buttonClick(){
  var $this = $(this);
  // var $A = $('#rA');
  // var $B = $('#rB');
  // var $C = $('#rC');
  // var $D = $('#rD');
  // var $E = $('#rE');
  // var $F = $('#rF');
  if($this.hasClass('ship')){
    // console.log($(this))
    if (state === "select ship") {
      size = parseInt($this.text());
      shipId = $this[0].id;

      
      state = "place ship";
      $state.text(state);
    };
  };
  if($this.hasClass('row')){

    if (state === "place ship") {
      row = $this.data('id');
      
      $coordR.text($this.text());
    };    
  };
  
  if($this.hasClass('col')){

    if (state === "place ship") {
      col = $this.text();
      
      console.log(limit);
      console.log($('button.ship'))

      $coordC.text($this.text());

    };     
  };
  if($this.hasClass('confirm')){

    if (state === "place ship") {
      if (grid[row][col] !== "S") {
        grid[row][col] = "S";
        limit -= 1; 
        row = '';
        col = '';
        $coordR.text(row);
        $coordC.text(col);
        document.getElementById(shipId).disabled = true;
        // if limit reached
        //   ship, row, col class disabled
        if (limit === 0) {
            var $buttonShip = $('button.ship')
            for(var i=0; i<$buttonShip.length; i++){
              $buttonShip[i].disabled = true; 
            }
            // document.getElementsByClassName('ship').disabled = true;
            // document.getElementsByClassName('row').disabled = true;
            // document.getElementsByClassName('col').disabled = true;
            state = "selection complete"; 
          $state.text(state);
        } else {
          state = "select ship"; 
          $state.text(state);
        }
        $A.text(grid[0]);
        $B.text(grid[1]);
        $C.text(grid[2]);
        $D.text(grid[3]);
        $E.text(grid[4]);
        $F.text(grid[5]);  
      };      
    };          
  };


}
