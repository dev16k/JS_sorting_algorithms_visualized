/*var arr = [1, 3, 2, 74, 32, 11, 05, 10, 22, 19];
console.log(arr.toString());
bubblesort(arr);
console.log(arr.toString());
*/
function bubblesort(arr)
{
  if (Array.isArray(arr))
  {
    var n = arr.length - 1;
    while (n > 0)
    {
      var newn = 0;
      for (var i = 0; i < n; i++)
      {
        if (arr[i] > arr[i + 1])
        {
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
