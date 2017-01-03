/*
var arr = [1, 3, 2, 74, 32, 11, 05, 10, 22, 19];
console.log(arr.toString());
insertion_sort(arr);
console.log(arr.toString());
*/
function insertion_sort(arr)
{
  if (Array.isArray(arr))
  {
    for (var i = 1; i < arr.length; i++)
    {
      for (var j = i; j > 0 && arr[j] < arr[j - 1]; j--)
      {
        var tmp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = tmp;
      }
    }
  }
}
/*function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}*/
function insertion_sort_draw(arr, arraydrawer)
{
  if (Array.isArray(arr))
  {
    for (var i = 1; i < arr.length; i++)
    {
      for (var j = i; j > 0 && arr[j] < arr[j - 1]; j--)
      {
        var tmp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = tmp;
        arraydrawer.draw();

      }
    }
  }
}
