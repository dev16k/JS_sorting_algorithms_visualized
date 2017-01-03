function cocktail_sort_draw(gs)
{
  var arr = gs.arr.slice();

  var lower = 1;
  var upper = arr.length - 1;
  var swapped;

  while (lower <= upper)
  {
    swapped = false;
    var nlower = upper;
    var nupper = lower;
    for (var j = lower; j <= upper; j++)
    {
      gs.compare([j, j + 1]);
      if (arr[j] > arr[j + 1])
      {
        gs.swap(j, j + 1);
        var tmp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = tmp;
        swapped = true;
        nupper = j;
      }
    }

    if(swapped == false){break};

    upper = nupper;
    swapped = true;
    for (var j = upper; j >= lower; j--)
    {
      gs.compare([j, j - 1]);
      if (arr[j] < arr[j - 1])
      {
        gs.swap(j, j - 1);
        var tmp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = tmp;
        nlower = j;
      }
    }
    lower = nlower;
  }
}
