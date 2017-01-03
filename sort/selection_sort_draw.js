function selection_sort_draw(gs, arr)
{
  if (Array.isArray(arr))
  {
    for (var i = 0; i < arr.length - 1; i++)
    {
      var min = i;
      for (var j = i; j < arr.length; j++)
      {
        gs.compare([j, min]);
        if (arr[j] < arr[min])
        {
          min = j;
        }
      }
      if (min != i)
      {
        gs.swap(min, i);

        var tmp = arr[min];
        arr[min] = arr[i];
        arr[i] = tmp;
      }
    }
  }
}
