function radix_sort_draw(gs)
{
  var arr = gs.arr.slice();

  var base = 4; //sets the base
  var buckets = []; //array to hold the buckets
  for (var i = 0; i < base; i++) //creates a number of buckets equal to the base
  {
    buckets.push([]);
  }

  var max = 0;
  for (var i = 0; i < arr.length; i++) //finds highest element in array
  {
    gs.compare([i, max]);
    if (arr[i] > arr[max])
    {
      max = i;
    }
  }

  var highestR = Math.floor((Math.log(arr[max]) / Math.log(base)).toFixed(6));

  for (var digit = 0; digit <= highestR; digit++)
  {
    for (var i = 0; i < arr.length; i++)
    {
      gs.read(i);
      var x = Math.floor((arr[i] % Math.pow(base, digit + 1)) / Math.pow(base, digit));
      buckets[x].push(arr[i]);
      gs.set();
    }

    var i = 0;
    for (var j = 0; j < base; j++)
    {
      for (var k = 0; k < buckets[j].length; k++)
      {
        gs.read();
        arr[i] = buckets[j][k];
        gs.set(i, buckets[j][k]);
        i++;
      }
      buckets[j] = [];
    }
  }
}
