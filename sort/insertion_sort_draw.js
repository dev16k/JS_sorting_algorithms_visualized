function insertion_sort_draw(gs, arr)
{
  if (Array.isArray(arr))
  {
    for (var i = 1; i < arr.length; i++)
    {
      for (var j = i; j > 0; j--)
      {
        gs.compare([j, j - 1]);
        if (arr[j] < arr[j - 1])
        {
          gs.swap(j, j - 1);
          var tmp = arr[j - 1];
          arr[j - 1] = arr[j];
          arr[j] = tmp;
        }
        else
        {
          break;
        }
      }
    }
  }
}
