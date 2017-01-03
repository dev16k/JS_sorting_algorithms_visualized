var GraphicalSorter = function(arr, canvas, func, name)
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

  this.blue = [];
  this.red = [];

  this.comparisions = 0;
  this.reads = 0;
  this.writes = 0;

  this.draw();

  func(this);

  var self = this;
  this.actions.push(function(){self.final = true;});

};

//executes the first function of the 'actions'-array and removes it
//return whether a function has been executed
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

GraphicalSorter.prototype.draw = function()
{
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
  if (this.final)
  {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    for (var i = 0; i < this.arr.length; i++)
    {

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

      if (this.blue.indexOf(i) != -1) this.ctx.fillStyle = '#0000BB';
      else if (this.red.indexOf(i) != -1) this.ctx.fillStyle = '#BB0000';
      else if (i % 2 === 1) this.ctx.fillStyle = '#FFFFFF';
      else this.ctx.fillStyle = '#EEEEEE';

      this.ctx.fillRect(i * this.scaleX, this.canvas.height, this.scaleX, - this.arr[i] * this.scaleY);
    }
  }
}

//----------callbacks to be added to actions[]----------------------------------
// these are NOT supposed to be called by anyone but the GraphicalSorter-prototype functions
GraphicalSorter.prototype.highlight = function(is)
{
  for (let i of is)
  {
    this.red.push(i);
  }
}

GraphicalSorter.prototype.swapValues = function(index1, index2)
{
  var tmp = this.arr[index1];
  this.arr[index1] = this.arr[index2];
  this.arr[index2] = tmp;
  this.blue.push(index1);
  this.blue.push(index2);
}

GraphicalSorter.prototype.changeValue = function(index, value)
{
  this.arr[index] = value;
  this.blue.push(index);
}
//----------end of callbacks----------------------------------------------------



//functions to be called by the sorting function when cangeing the array--------

/*they dont return anything or change anything in the array right when they are
called so you still have to swap/compare/... the elements by yourself*/
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

GraphicalSorter.prototype.swap = function(index1, index2)
{
  var self = this;
  this.actions.push(function(){self.swapValues(index1, index2);});
  this.reads++;
  this.reads++;
  this.writes++;
  this.writes++;
}

GraphicalSorter.prototype.set = function(index, value)
{
  if (index != undefined)
  {
    var self = this;
    this.actions.push(function(){self.changeValue(index, value);});
  }
  this.writes++;
};

GraphicalSorter.prototype.read = function(index)
{
  if (index != undefined)
  {
    var self = this;
    this.actions.push(function(){self.highlight([index]);});
  }
  this.reads++;
}
//
