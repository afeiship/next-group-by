var assert = require('assert');
var nx = require('next-js-core2');
require('../src/next-group-by');

describe('next/groupBy', function () {

  it('nx.groupBy odd/eve', function () {
    var arr1 = [1,2,3,4,5,6,7,8,9];

    var res1 = nx.groupBy(arr1, (_,item)=>{
      return item % 2;
    });

    assert.equal( res1['0'].length, 4)
    assert.equal( res1['1'].length, 5)
  });

});
