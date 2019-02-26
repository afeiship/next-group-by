# next-group-by
> Creates an object composed of keys generated from the results of running each element of collection thru iteratee. 

## usage:
```js
var arr1 = [1,2,3,4,5,6,7,8,9];
var res1 = nx.groupBy(arr1, (_,item)=>{
  return item % 2;
});
```
