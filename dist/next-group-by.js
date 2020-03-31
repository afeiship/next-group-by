/*!
 * name: @feizheng/next-group-by
 * description: Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
 * url: https://github.com/afeiship/next-group-by
 * version: 1.0.0
 * date: 2020-03-31 23:48:46
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');

  nx.groupBy = function (inArray, inCallback) {
    var result = {};
    for (var index = 0; index < inArray.length; index++) {
      var element = inArray[index];
      var value = inCallback.call(inArray, index, element, inArray);
      result[value] = (result[value] || []).concat(element);
    }
    return result;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.groupBy;
  }
})();

//# sourceMappingURL=next-group-by.js.map
