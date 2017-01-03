function quick_sort_draw(gs, arr, low, high)
{
  if (low == undefined || high == undefined)
  {
    quick_sort_draw(gs, arr, 0, arr.length - 1);
  }
  else if(low < high)
  {
    var p = partition(gs, arr, low, high);
    quick_sort_draw(gs, arr, low, p);
    quick_sort_draw(gs, arr, p + 1, high);
  }
}

function partition(gs, arr, low, high)
{
  var pivot = arr[Math.floor((low + high) / 2)];

  var i = low - 1;
  var j = high + 1;

  while (true)
  {
    i++;
    gs.compare([i]);
    while(arr[i] < pivot)
    {
      i++;
      gs.compare([i]);
    }

    j--;
    gs.compare([j]);
    while(arr[j] > pivot)
    {
      j--;
      gs.compare([j]);
    }

    if (i >= j)
    {
      return j;
    }

    gs.swap(i, j);
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}
