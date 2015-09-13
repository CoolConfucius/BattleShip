$(document).ready(init);

var grid = [
['[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] '],
['[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] '], 
['[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] '],
['[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] '],
['[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] '],
['[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] '], 
['[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] '],
['[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] '],
['[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] '],
['[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ', '[ ] ']
];

var row;
var col; 
var ships = [2, 3, 3, 4, 5]; //17. 
var limit = 5; 
var state = "select ship";
var size; 
var shipId; 
var shipCoords = []; 
var $state = $('#state');
var $coordR = $('#coordR');
var $coordC = $('#coordC');
function init() {
  $state.text(state);
  
  $('button').click(buttonClick); 
};

function buttonClick(){
  var $this = $(this);
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
      if (grid[row][col] !== "M" || grid[row][col] !== "H") {
        if (grid[row][col] === "S") {
          grid[row][col] = "H";
        } else {
          grid[row][col] = "M";
        }
      }
        
    }; 
  };


}
