/*var array = [1, 3, 2, 74, 32, 11, 05, 10, 22, 19];
console.log(array.toString());
merge_sort(array);
console.log(array.toString());
*/
function merge_sort(arr)
{
  if (Array.isArray(arr))
  {
    sort_part(arr, 0, arr.length - 1);
  }
}

function sort_part(arr, low, high)
{
  if (low < high)
  {
    var mid = Math.floor((low + high) / 2);
    sort_part(arr, low, mid);
    sort_part(arr, mid + 1, high);
    merge(arr, low, mid, high);
  }
}

function merge(arr, low, mid, high)
{
  var sorted = [];

  var i = low;
  var j = mid + 1;

  while (i <= mid && j <= high)
  {
    if (arr[i] < arr[j])
    {
      sorted.push(arr[i]);
      i++;
    }
    else
    {
      sorted.push(arr[j]);
      j++;
    }
  }

  while (i <= mid)
  {
    sorted.push(arr[i]);
    i++
  }
  while (j <= high)
  {
    sorted.push(arr[j]);
    j++
  }

  for (var k = 0; k < sorted.length; k++)
  {
    arr[low] = sorted[k];
    low++;
  }
}
