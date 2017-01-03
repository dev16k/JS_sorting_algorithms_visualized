function bubble_sort_draw(gs, arr)
{
  if (Array.isArray(arr))
  {
    var n = arr.length - 1;
    while (n > 0)
    {
      var newn = 0;
      for (var i = 0; i < n; i++)
      {
        gs.compare([i, i + 1]);
        if (arr[i] > arr[i + 1])
        {
          gs.swap(i, i+1);
          var tmp = arr[i + 1];
          arr[i + 1] = arr[i];
          arr[i] = tmp;
          newn = i;
        }
      }
      n = newn;
    }
  }
}
