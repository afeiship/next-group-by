# next-group-by
> Creates an object composed of keys generated from the results of running each element of collection thru iteratee.

## installation
```bash
npm install -S @feizheng/next-group-by
```

## usage
```js
import '@feizheng/next-group-by';

const arr = [
  'sljflsdjf.jpg',
  'bb.jpg',
  'bc.jpg',
  'ccsdf.jpg',
  'ccsdf.jpg',
  'http://www.agc.cn/1.jpg',
  'sldjfsld.jpg',
  'wx://localResource'
];

const res = nx.groupBy(arr, (_, item) => {
  var rs = item.split('://');
  return rs.length === 2 ? rs[0] : 'normal';
});

// result
{
  normal: [
    'sljflsdjf.jpg',
    'bb.jpg',
    'bc.jpg',
    'ccsdf.jpg',
    'ccsdf.jpg',
    'sldjfsld.jpg'
  ],
  http: [ 'http://www.agc.cn/1.jpg' ],
  wx: [ 'wx://localResource' ]
}
```
