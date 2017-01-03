function merge_sort_draw(gs)
{
  var arr = gs.arr.slice();

  merge_sort(arr, 0, arr.length - 1, gs);
}

function merge_sort(arr, low, high, gs)
{
  if (low < high)
  {
    var mid = Math.floor((low + high) / 2);
    merge_sort(arr, low, mid, gs);
    merge_sort(arr, mid + 1, high, gs);
    merge(arr, low, mid, high, gs);
  }
}

function merge(arr, low, mid, high, gs)
{
  var sorted = [];

  var i = low;
  var j = mid + 1;

  while (i <= mid && j <= high)
  {
    gs.compare([i, j]);

    if (arr[i] < arr[j])
    {
      gs.read(i);
      gs.set();

      sorted.push(arr[i]);
      i++;
    }
    else
    {
      gs.read(j);
      gs.set();

      sorted.push(arr[j]);
      j++;
    }
  }

  while (i <= mid)
  {
    gs.read(i);
    gs.set();

    sorted.push(arr[i]);
    i++;
  }
  while (j <= high)
  {
    gs.read(j);
    gs.set();

    sorted.push(arr[j]);
    j++;
  }

  for (var k = 0; k < sorted.length; k++)
  {
    gs.read();
    gs.set(low, sorted[k]);
    
    arr[low] = sorted[k];
    low++;
  }
}
