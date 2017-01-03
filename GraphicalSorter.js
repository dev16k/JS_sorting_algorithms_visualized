/**
 * Creates an instance of GraphicalSorter.
 *
 * @constructor
 * @param {array} arr - The array that should be sorted.
 * @param {HTMLCanvasElement} canvas - The canvas on which the array should be drawn.
 * @param {function} func - The sorting function which will be given this object as a parameter
 * @param {string} name - Optional name which will be displayed when the array has been sorted.
 */
function GraphicalSorter(arr, canvas, func, name)
{
  this.canvas = canvas;
  this.scaleX = this.canvas.width / arr.length;
  this.ctx = this.canvas.getContext('2d');
  this.arr = arr.slice(); //Array to be drawn and updated with actions[];

  if (name != undefined)this.name = name;
  else this.name = func.name;

  if (Math.max(...this.arr) > this.canvas.height / this.scaleX)
  {
    this.scaleY = this.canvas.height / Math.max(...this.arr);
  }
  else
  {
    this.scaleY = this.scaleX;
  }

  this.actions = [];
  this.final = false;

  this.blue = []; //elements to be drawn blue
  this.red = []; //elements to be drawn red

  //various counters
  this.comparisions = 0; //number of comparisions
  this.reads = 0; //number of read-accesses to the array
  this.writes = 0; //number of write-accesses to the array

  this.draw();

  /*executes the sorting function which calls
  swap()/compare()/... when changing the array*/
  func(this, arr.slice());

  //sets final to true when every action has been executed
  var self = this;
  this.actions.push(function(){self.final = true;});
};


/**executes the first function of the actions[] and removes it.
 *
 * @return {boolean} - True if a function has been executed.
 */
GraphicalSorter.prototype.executeAction = function()
{
  if(this.actions.length > 0)
  {
    this.blue = []; //clears the indexes to be drawn blue
    this.red = []; //clears the indexes to be drawn red
    this.actions.shift()(); //gets the first function of the 'actions'-array and executes it
    this.draw(); //redraws the array
    return true;
  }
  return false;
}


/**
 * Draws the array.
 */
GraphicalSorter.prototype.draw = function()
{
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
  if (this.final) //draws differently if the array is sorted
  {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    for (var i = 0; i < this.arr.length; i++)
    {

      //colors every 2nd element slightly different
      if (i % 2 === 1) this.ctx.fillStyle = '#009900';
      else this.ctx.fillStyle = '#008800';

      this.ctx.fillRect(i * this.scaleX, this.canvas.height, this.scaleX, - this.arr[i] * this.scaleY);
    }

    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    var fontsize = this.ctx.canvas.height / 7;
    this.ctx.font = fontsize + "px Courier New";
    this.ctx.fillText(this.name, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 - fontsize, this.ctx.canvas.width);
    this.ctx.fillText("comparisions:" + this.comparisions, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2, this.ctx.canvas.width);
    this.ctx.fillText("read-accesses:" + this.reads, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + fontsize, this.ctx.canvas.width);
    this.ctx.fillText("write-accesses:" + this.writes, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 2 * fontsize, this.ctx.canvas.width);
  }
  else
  {
    for (var i = 0; i < this.arr.length; i++)
    {

      //colors elements with indexes in blue[] blue
      if (this.blue.indexOf(i) != -1) this.ctx.fillStyle = '#0000BB';
      //colors elements with indexes in red[] red
      else if (this.red.indexOf(i) != -1) this.ctx.fillStyle = '#BB0000';
      //colors every 2nd element slightly different
      else if (i % 2 === 1) this.ctx.fillStyle = '#FFFFFF';
      else this.ctx.fillStyle = '#EEEEEE';

      this.ctx.fillRect(i * this.scaleX, this.canvas.height, this.scaleX, - this.arr[i] * this.scaleY);
    }
  }
}


//callbacks to be added to actions[]
// these are NOT supposed to be called by anyone but the GraphicalSorter-prototype functions
/** @private */
GraphicalSorter.prototype.highlight = function(is)
{
  for (let i of is)
  {
    this.red.push(i);
  }
}

/** @private */
GraphicalSorter.prototype.swapValues = function(index1, index2)
{
  var tmp = this.arr[index1];
  this.arr[index1] = this.arr[index2];
  this.arr[index2] = tmp;
  this.blue.push(index1);
  this.blue.push(index2);
}

/** @private */
GraphicalSorter.prototype.changeValue = function(index, value)
{
  this.arr[index] = value;
  this.blue.push(index);
}



/*functions to be called by the sorting function when changeing the array

they add the callback functions above to the actions-array which will be
executed when calling the executeAction()-function

they dont return anything or change anything in the array right when they are
called so you still have to swap/compare/... the elements by yourself*/

/**
 * Adds the highlight()-callback which colors the given elements differently
 * to the later executed actions[] and increases the counters.
 *
 * Is to be called when comparing elements.
 *
 * @param {array} is - Optional array of the compared elements' indexes.
 */
GraphicalSorter.prototype.compare = function(is)
{
  if (is.length != 0)
  {
    var self = this;
    this.actions.push(function(){self.highlight(is);});
  }
  this.comparisions++;
  this.reads++;
  this.reads++;
}

/**
 * Adds the swapValues()-callback which swaps 2 elements to the later executed
 * actions[] and increases the counters.
 * Is to be called when swapping 2 elements of the array.
 *
 * @param {number} index1 - One of the swapped elements' index.
 * @param {number} index2 - The other element's index.
 */
GraphicalSorter.prototype.swap = function(index1, index2)
{
  var self = this;
  this.actions.push(function(){self.swapValues(index1, index2);});
  this.reads++;
  this.reads++;
  this.writes++;
  this.writes++;
}

/**
 * Adds the changeValue()-callback to the later executed actions[] and
 * increases the counters.
 *
 * Is to be called when changeing a single element in the array.
 * Should not be called in addition to calling swap().
 *
 * @param {number} index - Optional index of the element to be changed.
 * @param {number} value - The value the element should be changed to. Necessary if given an index.
 */
GraphicalSorter.prototype.set = function(index, value)
{
  if (index != undefined)
  {
    var self = this;
    this.actions.push(function(){self.changeValue(index, value);});
  }
  this.writes++;
};

/**
 * Adds the highlight()-callback which colors the given elements differently
 * to the later executed actions[] and increases the counters.
 *
 * Should be called when reading a single value from the array.
 * Should not be called in addition to swap() or compare() etc.
 *
 * @param {number} index - Optional index of the element being read.
 */
GraphicalSorter.prototype.read = function(index)
{
  if (index != undefined)
  {
    var self = this;
    this.actions.push(function(){self.highlight([index]);});
  }
  this.reads++;
}
