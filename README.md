# next-group-by
> Creates an object composed of keys generated from the results of running each element of collection thru iteratee.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-group-by
```

## usage
```js
import '@jswork/next-group-by';

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

const res = nx.groupBy(arr, (item) => {
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
  wx: [ 'wx://localResource' ],
  __computed__: {
    normal: 6,
    http: 1,
    wx: 1
  }
}
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-group-by/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-group-by
[version-url]: https://npmjs.org/package/@jswork/next-group-by

[license-image]: https://img.shields.io/npm/l/@jswork/next-group-by
[license-url]: https://github.com/afeiship/next-group-by/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-group-by
[size-url]: https://github.com/afeiship/next-group-by/blob/master/dist/next-group-by.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-group-by
[download-url]: https://www.npmjs.com/package/@jswork/next-group-by
