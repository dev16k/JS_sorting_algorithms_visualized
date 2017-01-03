function radix_sort_draw(gs, arr)
{
  var base = 4;
  var buckets = [];
  for (var i = 0; i < base; i++)
  {
    buckets.push([]);
  }

  var max = 0;
  for (var i = 0; i < arr.length; i++)
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
      gs.set();

      var x = Math.floor((arr[i] % Math.pow(base, digit + 1)) / Math.pow(base, digit));
      buckets[x].push(arr[i]);
    }

    var i = 0;
    for (var j = 0; j < base; j++)
    {
      for (var k = 0; k < buckets[j].length; k++)
      {
        gs.read();
        gs.set(i, buckets[j][k]);

        arr[i] = buckets[j][k];
        i++;
      }
      buckets[j] = [];
    }
  }
}
