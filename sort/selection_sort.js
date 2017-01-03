/*var arr = [1, 3, 2, 74, 32, 11, 05, 10, 22, 19];
console.log(arr.toString());
selection_sort(arr);
console.log(arr.toString());
*/
function selection_sort(arr)
{
  if (Array.isArray(arr))
  {
    for (var i = 0; i < arr.length - 1; i++)
    {
      var min = i;
      for (var j = i; j < arr.length; j++)
      {
        if (arr[j] < arr[min])
        {
          min = j;
        }
      }
      if (min != i)
      {
        var tmp = arr[i];
        arr[i] = arr[min];
        arr[min] = tmp;
      }
    }
  }
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function selection_sort_draw(arr, ad)
{
  if (Array.isArray(arr))
  {
    for (var i = 0; i < arr.length - 1; i++)
    {
      var min = i;
      for (var j = i; j < arr.length; j++)
      {
        if (arr[j] < arr[min])
        {
          min = j;
        }
      }
      if (min != i)
      {
        var tmp = arr[i];
        arr[i] = arr[min];
        arr[min] = tmp;
        await sleep(10);
        ad.redraw(i);
        ad.redraw(min);
      }
    }
  }
}
